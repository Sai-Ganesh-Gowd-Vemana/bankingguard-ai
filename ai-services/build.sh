
#!/usr/bin/env bash
set -e
apt-get update -qq
apt-get install -y tesseract-ocr tesseract-ocr-eng
pip install -r requirements.txt
echo "✅ Build complete"