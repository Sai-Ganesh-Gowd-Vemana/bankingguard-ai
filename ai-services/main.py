# ============================
# IMPORTS
# ============================
from groq import Groq
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from url_features import extract_features
from dotenv import load_dotenv
load_dotenv()
import os
import io
import json
import pickle
import numpy as np
import pytesseract
import cv2

from PIL import Image
from huggingface_hub import hf_hub_download

# ============================
# APP INIT
# ============================
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI(title="BankingGuard AI API")

# ============================
# CORS — only once, at top
# ============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# TESSERACT CONFIG
# ============================
if os.name == "nt":
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
else:
    pytesseract.pytesseract.tesseract_cmd = "/usr/bin/tesseract"

# ============================
# LOAD MODELS
# ============================
HF_REPO = "SaiGaneshGowdVemana/bankingguard-models"

def download_models():
    os.makedirs("models", exist_ok=True)
    files = ["spam_model.pkl", "tfidf_vectorizer.pkl", "url_model.pkl", "tfidf_url.pkl"]
    for f in files:
        if not os.path.exists(f"models/{f}"):
            print(f"⬇ Downloading {f} ...")
            hf_hub_download(
                repo_id=HF_REPO,
                filename=f,
                local_dir="models",
                local_dir_use_symlinks=False,
            )
            print(f"✅ {f} ready")
        else:
            print(f"✅ {f} already exists")
    print("🎉 All models ready!")

download_models()

import joblib

# SMS
model = joblib.load("models/spam_model.pkl")
vectorizer = joblib.load("models/tfidf_vectorizer.pkl")

# URL
url_model = joblib.load("models/url_model.pkl")
tfidf = joblib.load("models/tfidf_url.pkl")
# ============================
# SUSPICIOUS WORD DETECTOR
# ============================
def get_suspicious_words(text, top_n=5):
    """Extract top suspicious words from text using TF-IDF weights"""
    try:
        feature_names = vectorizer.get_feature_names_out()
        vector = vectorizer.transform([text])
        scores = zip(feature_names, vector.toarray()[0])
        sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
        spam_indicator_words = [
            "free","win","won","prize","claim","urgent","alert","verify",
            "update","kyc","otp","password","bank","account","suspended",
            "blocked","click","link","offer","congratulations","selected",
            "reward","cash","lucky","limited","expire","immediate","action",
            "confirm","secure","login","credential","transfer","lottery",
            "gift","bonus","exclusive","guaranteed","risk","invest","double"
        ]
        suspicious = []
        for word, score in sorted_scores:
            if score > 0 and (word in spam_indicator_words or len(word) > 3):
                suspicious.append(word)
            if len(suspicious) >= top_n:
                break
        return suspicious
    except:
        return []

# ============================
# URL SUSPICIOUS FEATURES
# ============================
def get_url_reasons(url):
    reasons = []
    url_lower = url.lower()
    if "https" not in url_lower:
        reasons.append("No HTTPS — connection is not encrypted")
    suspicious_keywords = ["login","verify","bank","secure","account",
                           "update","confirm","password","otp","kyc"]
    found = [w for w in suspicious_keywords if w in url_lower]
    if found:
        reasons.append(f"Suspicious keywords found: {', '.join(found)}")
    if url.count('.') > 3:
        reasons.append(f"Too many dots ({url.count('.')}) — possible subdomain trick")
    if url.count('-') > 2:
        reasons.append(f"Multiple hyphens — common in fake domains")
    if len(url) > 75:
        reasons.append(f"Very long URL ({len(url)} chars) — often used to hide real destination")
    tlds = [".xyz",".top",".click",".info",".tk",".ml",".ga",".cf"]
    for tld in tlds:
        if tld in url_lower:
            reasons.append(f"Suspicious domain extension: {tld}")
    if sum(c.isdigit() for c in url) > 5:
        reasons.append("Many digits in URL — unusual for legitimate banks")
    return reasons

# ============================
# REQUEST MODELS
# ============================
class MessageRequest(BaseModel):
    message: str

class URLRequest(BaseModel):
    url: str

class LoanRequest(BaseModel):
    income: float
    credit_score: int
    existing_loans: int

class EntityRequest(BaseModel):
    company: str

class ChatRequest(BaseModel):
    message: str

class Reminder(BaseModel):
    title: str
    date: str

# ============================
# ROOT
# ============================
@app.get("/")
def home():
    return {"message": "BankingGuard AI API Running"}

# ============================
# SMS DETECTION
# ============================
@app.post("/detect-sms")
def detect_sms(data: MessageRequest):
    message = data.message
    vector = vectorizer.transform([message])
    prediction = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]
    spam_index = list(model.classes_).index("spam")
    spam_probability = probs[spam_index]
    label = "spam" if prediction == "spam" else "safe"
    suspicious_words = get_suspicious_words(message) if label == "spam" else []
    return {
        "message": message,
        "prediction": label,
        "confidence": round(spam_probability * 100, 2),
        "suspicious_words": suspicious_words
    }

# ============================
# URL DETECTION
# ============================
@app.post("/detect-url")
def detect_url(data: URLRequest):
    url = data.url
    from scipy.sparse import hstack

# TF-IDF features
    X_text = tfidf.transform([url])

# Numeric features
    X_num = np.array([extract_features(url)])

# Combine both
    X_final = hstack((X_text, X_num))

# Predict
    prediction = url_model.predict(X_final)[0]
    probability = url_model.predict_proba(X_final)[0].max()
    label = "phishing" if prediction == 1 else "safe"
    reasons = get_url_reasons(url) if label == "phishing" else []
    return {
        "url": url,
        "prediction": label,
        "confidence": round(probability * 100, 2),
        "reasons": reasons
    }

# ============================
# IMAGE DETECTION
# ============================
@app.post("/detect-image")
async def detect_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        img = np.array(image)
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        extracted_text = pytesseract.image_to_string(gray)

        if not extracted_text.strip():
            return JSONResponse(content={
                "text": "No text detected in image",
                "prediction": "unknown",
                "confidence": 0,
                "suspicious_words": []
            })

        vector = vectorizer.transform([extracted_text])
        prediction = model.predict(vector)[0]
        probs = model.predict_proba(vector)[0]
        spam_index = list(model.classes_).index("spam")
        confidence = probs[spam_index]
        label = "scam" if prediction == "spam" else "safe"
        suspicious_words = get_suspicious_words(extracted_text) if label == "scam" else []

        return JSONResponse(content={
            "text": extracted_text,
            "prediction": label,
            "confidence": round(confidence * 100, 2),
            "suspicious_words": suspicious_words
        })
    except Exception as e:
        return JSONResponse(content={
            "text": "",
            "prediction": "error",
            "confidence": 0,
            "suspicious_words": [],
            "error": str(e)
        })

# ============================
# LOAN ELIGIBILITY
# ============================
@app.post("/loan-eligibility")
def loan_eligibility(data: LoanRequest):
    income = data.income
    credit = data.credit_score
    loans  = data.existing_loans
    score  = 0

    if income >= 50000:   score += 2
    elif income >= 25000: score += 1

    if credit >= 750:     score += 3
    elif credit >= 700:   score += 2
    elif credit >= 650:   score += 1

    if loans == 0:        score += 2
    elif loans <= 5000:   score += 2
    elif loans <= 15000:  score += 1

    if score >= 5:   result = "Eligible"
    elif score >= 3: result = "Possibly Eligible"
    else:            result = "Not Eligible"

    return {
        "income": income,
        "credit_score": credit,
        "existing_loans": loans,
        "loan_result": result
    }

# ============================
# INVESTMENT CHECK
# ============================
with open("utils/entities.json") as f:
    entities = json.load(f)["registered_entities"]

@app.post("/check-investment")
def check_investment(data: EntityRequest):
    name = data.company.lower()
    for entity in entities:
        if entity.lower() in name:
            return {"company": data.company, "status": "Registered / Likely Safe"}
    return {"company": data.company, "status": "Unknown / Possible Fraud"}

# ============================
# CHATBOT
# ============================
with open("utils/conversation_data.json") as f:
    chatbot_data = json.load(f)

@app.post("/chatbot")
def chatbot(data: ChatRequest):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a banking fraud awareness assistant. Answer in maximum 2 sentences. Keep answers short, clear and easy to understand."},
            {"role": "user",   "content": data.message}
        ]
    )
    return {"reply": response.choices[0].message.content}

# ============================
# QUIZ
# ============================
@app.get("/quiz")
def quiz():
    return {"quiz": [], "note": "Questions managed client-side"}

# ============================
# REMINDERS
# ============================
reminders = []

@app.post("/add-reminder")
def add_reminder(reminder: Reminder):
    reminders.append({"title": reminder.title, "date": reminder.date})
    return {"message": "Reminder added successfully", "reminder": reminder}

@app.get("/reminders")
def get_reminders():
    return {"reminders": reminders}

@app.delete("/delete-reminder/{index}")
def delete_reminder(index: int):
    if 0 <= index < len(reminders):
        removed = reminders.pop(index)
        return {"message": "Reminder deleted", "removed": removed}
    return {"error": "Reminder not found"}