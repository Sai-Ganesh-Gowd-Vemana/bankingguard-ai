import re
import numpy as np
from urllib.parse import urlparse

def extract_features(url):

    url = url.lower()
    parsed = urlparse(url)

    domain = parsed.netloc
    path = parsed.path

    features = []

    # ===== BASIC FEATURES (your original) =====
    features.append(len(url))
    features.append(url.count('.'))
    features.append(url.count('-'))
    features.append(sum(c.isdigit() for c in url))
    features.append(url.count('/'))
    features.append(url.count('?'))
    features.append(url.count('='))
    features.append(url.count('@'))
    features.append(1 if "https" in url else 0)

    # ===== KEYWORD FEATURE (your logic improved) =====
    suspicious_keywords = [
        "login","verify","bank","secure",
        "account","update","confirm",
        "password","otp","kyc"
    ]

    features.append(int(any(word in url for word in suspicious_keywords)))

    # ===== NEW ADVANCED FEATURES =====
    features.append(len(domain))                         # domain length
    features.append(len(path))                           # path length
    features.append(int(len(domain.split('.')) > 3))     # many subdomains
    features.append(int('-' in domain))                  # fake domain trick
    features.append(int(re.search(r'\d', domain) is not None))  # digits in domain
    features.append(int(url.count('//') > 1))            # double slash trick
    features.append(int(len(path) > 50))                 # long path

    return np.array(features)