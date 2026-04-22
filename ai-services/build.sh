#!/usr/bin/env bash

pip install -r requirements.txt

# Install tesseract using pip's system
pip install tesseract-bin 2>/dev/null || true

# Try downloading prebuilt binary
mkdir -p /tmp/tesseract/bin
curl -sL "https://github.com/Jim-Dev/tesseract-binary/releases/download/v5.0.0/tesseract_linux_amd64" \
     -o /tmp/tesseract/bin/tesseract
chmod +x /tmp/tesseract/bin/tesseract
/tmp/tesseract/bin/tesseract --version || echo "tesseract install failed"