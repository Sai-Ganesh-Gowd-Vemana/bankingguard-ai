#!/usr/bin/env bash

pip install -r requirements.txt


# Use /tmp which is writable on Render
mkdir -p /tmp/tesseract
wget -q https://github.com/tesseract-ocr/tesseract/releases/download/5.3.3/tesseract-ocr-linux-amd64.tar.gz -O /tmp/tess.tar.gz
tar -xzf /tmp/tess.tar.gz -C /tmp/tesseract --strip-components=1
export PATH="/tmp/tesseract/bin:$PATH"
tesseract --version