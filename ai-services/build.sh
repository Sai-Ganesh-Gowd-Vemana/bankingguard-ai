#!/usr/bin/env bash

pip install -r requirements.txt

# Download tesseract portable binary directly
mkdir -p /opt/tesseract
wget -q https://github.com/tesseract-ocr/tesseract/releases/download/5.3.3/tesseract-ocr-linux-amd64.tar.gz -O /tmp/tess.tar.gz
tar -xzf /tmp/tess.tar.gz -C /opt/tesseract --strip-components=1
export PATH="/opt/tesseract/bin:$PATH"
tesseract --version