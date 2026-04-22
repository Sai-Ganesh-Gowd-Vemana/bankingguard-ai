#!/usr/bin/env bash

pip install -r requirements.txt
pip install tesseract-bin

# Find where tesseract-bin installed the binary
find / -name "tesseract" -type f 2>/dev/null | head -5
echo "PATH: $PATH"