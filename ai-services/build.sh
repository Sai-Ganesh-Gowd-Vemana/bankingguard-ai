

#!/usr/bin/env bash
pip install -r requirements.txt
tesseract --version || apt-get install -y tesseract-ocr
echo "✅ Build complete"