# ============================
# IMPORTS
# ============================
from groq import Groq
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from url_features import extract_features

import os
import io
import json
import pickle
import re
import pytesseract
import cv2
import numpy as np

from PIL import Image
from typing import List

import os
from huggingface_hub import hf_hub_download


# ============================
# APP INIT
# ============================
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

app = FastAPI(title="BankingGuard AI API")


# ============================
# CORS (IMPORTANT FOR REACT)
# ============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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
# (Auto-downloads from Hugging Face if not present)
# ============================

HF_REPO = "SaiGaneshGowdVemana/bankingguard-models"

def download_models():
    os.makedirs("models", exist_ok=True)

    # Force fresh download every restart
    # (safe because Render disk is wiped on each deploy anyway)
    if os.path.exists("models/.ready"):
        os.remove("models/.ready")

    files = [
        "spam_model.pkl",
        "tfidf_vectorizer.pkl",
        "url_model.pkl",
    ]

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

    open("models/.ready", "w").close()
    print("🎉 All models ready!")

download_models()

model      = pickle.load(open("models/spam_model.pkl", "rb"))
vectorizer = pickle.load(open("models/tfidf_vectorizer.pkl", "rb"))
url_model  = pickle.load(open("models/url_model.pkl", "rb"))

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
# ROOT API
# ============================

@app.get("/")
def home():
    return {"message": "BankingGuard AI API Running"}


# ============================
# SMS SCAM DETECTION
# ============================

# ============================
# SMS SCAM DETECTION (ML MODEL)
# ============================

@app.post("/detect-sms")
def detect_sms(data: MessageRequest):

    message = data.message

    # Convert message → vector
    vector = vectorizer.transform([message])

    # Prediction
    prediction = model.predict(vector)[0]

    probs = model.predict_proba(vector)[0]

    spam_index = list(model.classes_).index("spam")

    spam_probability = probs[spam_index]

    label = "spam" if prediction == "spam" else "safe"

    return {
        "message": message,
        "prediction": label,
        "confidence": round(spam_probability * 100, 2)
    }


# ============================
# URL PHISHING DETECTION
# ============================

@app.post("/detect-url")
def detect_url(data: URLRequest):

    url = data.url

    # Extract ML features
    features = extract_features(url)

    # Prediction
    prediction = url_model.predict([features])[0]

    # Confidence
    probability = url_model.predict_proba([features])[0].max()

    label = "phishing" if prediction == 1 else "safe"

    return {
        "url": url,
        "prediction": label,
        "confidence": round(probability * 100, 2)
    }

# ============================
# SCREENSHOT SCAM DETECTION
# ============================

@app.post("/detect-image")
async def detect_image(file: UploadFile = File(...)):

    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    img = np.array(image)

    # FIX: Use RGB2GRAY instead of BGR2GRAY
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

    extracted_text = pytesseract.image_to_string(gray)

    if not extracted_text.strip():
        return {
            "text": "No text detected in image",
            "prediction": "unknown",
            "confidence": 0
        }

    vector = vectorizer.transform([extracted_text])
    prediction = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]
    spam_index = list(model.classes_).index("spam")
    confidence = probs[spam_index]
    label = "scam" if prediction == "spam" else "safe"

    return {
        "text": extracted_text,
        "prediction": label,
        "confidence": round(confidence * 100, 2)
    }


# ============================
# LOAN ELIGIBILITY
# ============================

@app.post("/loan-eligibility")
def loan_eligibility(data: LoanRequest):

    income = data.income
    credit = data.credit_score
    loans  = data.existing_loans

    score = 0

    if income >= 50000:
        score += 2
    elif income >= 25000:
        score += 1

    if credit >= 750:
        score += 3
    elif credit >= 700:
        score += 2
    elif credit >= 650:
        score += 1

    if loans == 0:
        score += 2
    elif loans <= 5000:
        score += 2
    elif loans <= 15000:
        score += 1

    if score >= 5:
        result = "Eligible"
    elif score >= 3:
        result = "Possibly Eligible"
    else:
        result = "Not Eligible"

    return {
        "income": income,
        "credit_score": credit,
        "existing_loans": loans,
        "loan_result": result
    }

# ============================
# INVESTMENT FRAUD CHECK
# ============================

with open("utils/entities.json") as f:
    entities = json.load(f)["registered_entities"]


@app.post("/check-investment")
def check_investment(data: EntityRequest):

    name = data.company.lower()

    for entity in entities:
        if entity.lower() in name:
            return {
                "company": data.company,
                "status": "Registered / Likely Safe"
            }

    return {
        "company": data.company,
        "status": "Unknown / Possible Fraud"
    }


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
            {
    "role": "system",
    "content": "You are a banking fraud awareness assistant. Answer in maximum 2 sentences. Keep answers short, clear and easy to understand."
},
            {
                "role": "user",
                "content": data.message
            }
        ]
    )

    reply = response.choices[0].message.content

    return {"reply": reply}

# ============================
# QUIZ
# ============================

@app.get("/quiz")
def quiz():
    # NOTE: Frontend now uses its own built-in question bank (150 questions, shuffled).
    # This endpoint is kept for backward compatibility only.
    # Returning empty list — frontend does not call this endpoint anymore.
    return {"quiz": [], "note": "Questions are now managed client-side with 150 shuffled questions."}

@app.get("/quiz-legacy")
def quiz_legacy():

    questions = [

{
"question":"What should you do if someone asks for your OTP?",
"options":["Share it","Ignore and report","Send via SMS","Post online"],
"answer":"Ignore and report"
},

{
"question":"What is OTP used for?",
"options":["Entertainment","Security verification","Shopping","Gaming"],
"answer":"Security verification"
},

{
"question":"If you receive a message saying your bank account will be blocked unless you click a link, what should you do?",
"options":["Click the link","Ignore and verify with bank","Share OTP","Forward to friends"],
"answer":"Ignore and verify with bank"
},

{
"question":"Which of these is a common phishing method?",
"options":["Fake emails","Secure banking apps","Bank branches","ATM machines"],
"answer":"Fake emails"
},

{
"question":"Should you share your banking password with anyone?",
"options":["Yes","Only with bank","No","Sometimes"],
"answer":"No"
},

{
"question":"What should you check before clicking a banking link?",
"options":["URL authenticity","Color of website","Advertisements","Images"],
"answer":"URL authenticity"
},

{
"question":"Which message is most likely a scam?",
"options":["Account statement email","You won a lottery click here","Bank transaction alert","Monthly report"],
"answer":"You won a lottery click here"
},

{
"question":"What is KYC scam?",
"options":["Fake request to update KYC","Bank loan offer","ATM withdrawal","Credit card offer"],
"answer":"Fake request to update KYC"
},

{
"question":"If someone claims to be a bank officer and asks for your OTP, what should you do?",
"options":["Share it","Ignore and report","Send password","Give card number"],
"answer":"Ignore and report"
},

{
"question":"Which website is safer?",
"options":["http://bank-login.xyz","https://www.sbi.co.in","http://verify-account.top","http://bank-secure.xyz"],
"answer":"https://www.sbi.co.in"
},

{
"question":"What should you do if you accidentally shared your OTP?",
"options":["Ignore it","Contact bank immediately","Post online","Turn off phone"],
"answer":"Contact bank immediately"
},

{
"question":"Which of the following is a sign of phishing?",
"options":["Urgent action required message","Monthly bank report","Salary credit alert","Account summary"],
"answer":"Urgent action required message"
},

{
"question":"What should you do before downloading a banking app?",
"options":["Check official store","Download anywhere","Use random websites","Use unknown links"],
"answer":"Check official store"
},

{
"question":"What is the safest way to access your bank account online?",
"options":["Official bank website","Unknown links","Random ads","SMS links"],
"answer":"Official bank website"
},

{
"question":"Which detail should never be shared?",
"options":["Account balance","OTP","Branch name","Bank name"],
"answer":"OTP"
},

{
"question":"What is phishing?",
"options":["Fishing activity","Online fraud attempt","Bank service","ATM transaction"],
"answer":"Online fraud attempt"
},

{
"question":"If a website asks for OTP to verify your account unexpectedly, what should you do?",
"options":["Enter OTP","Ignore and close page","Send password","Share details"],
"answer":"Ignore and close page"
},

{
"question":"What is the safest way to verify bank messages?",
"options":["Contact bank directly","Reply to message","Click links","Share details"],
"answer":"Contact bank directly"
},

{
"question":"Which message looks suspicious?",
"options":["Your salary credited","Update KYC immediately or account blocked","Bank statement available","ATM withdrawal alert"],
"answer":"Update KYC immediately or account blocked"
},

{
"question":"What should you do if you receive a suspicious banking message?",
"options":["Report it","Click link","Reply message","Share OTP"],
"answer":"Report it"
}

]

    return {"quiz": questions}


# ============================
# REMINDER SYSTEM
# ============================

reminders = []

@app.post("/add-reminder")
def add_reminder(reminder: Reminder):
    reminders.append({
        "title": reminder.title,
        "date": reminder.date
    })
    return {
        "message": "Reminder added successfully",
        "reminder": reminder
    }

@app.get("/reminders")
def get_reminders():
    return {"reminders": reminders}

@app.delete("/delete-reminder/{index}")
def delete_reminder(index: int):
    if 0 <= index < len(reminders):
        removed = reminders.pop(index)
        return {
            "message": "Reminder deleted",
            "removed": removed
        }
    return {"error": "Reminder not found"}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # we keep * for now, update after you get Vercel URL
    allow_credentials=False,  # must be False when using *
    allow_methods=["*"],
    allow_headers=["*"],
)

import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=10000)
    
