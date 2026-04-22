#!/usr/bin/env bash

# Install tesseract with sudo
sudo apt-get update -y
sudo apt-get install -y tesseract-ocr tesseract-ocr-eng

# Verify installation
tesseract --version

pip install -r requirements.txt