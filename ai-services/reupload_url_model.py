from huggingface_hub import HfApi

api = HfApi()

HF_TOKEN = "hf_your_new_token_here"  # your NEW token from huggingface
REPO_ID  = "SaiGaneshGowdVemana/bankingguard-models"

print("Uploading new url_model.pkl...")
api.upload_file(
    path_or_fileobj="models/url_model.pkl",
    path_in_repo="url_model.pkl",
    repo_id=REPO_ID,
    repo_type="model",
    token=HF_TOKEN,
)
print("✅ Done! New smaller model uploaded.")