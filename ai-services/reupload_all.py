from huggingface_hub import HfApi
import os

api = HfApi()
HF_TOKEN = os.getenv("HF_TOKEN") 
REPO_ID  = "SaiGaneshGowdVemana/bankingguard-models"

files = [
    "models/spam_model.pkl",
    "models/tfidf_vectorizer.pkl",
    "models/url_model.pkl",
    "models/tfidf_url.pkl"   
]

for filepath in files:
    filename = os.path.basename(filepath)
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"⬆ Uploading {filename} ({size_mb:.1f} MB)...")
    api.upload_file(
        path_or_fileobj=filepath,
        path_in_repo=filename,
        repo_id=REPO_ID,
        repo_type="model",
        token=HF_TOKEN,
    )
    print(f"✅ {filename} done!")

print("🎉 All models re-uploaded!")