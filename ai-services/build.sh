#!/usr/bin/env bash
apt-get install -y tesseract-ocr tesseract-ocr-eng
pip install -r requirements.txt
echo "✅ Build complete"