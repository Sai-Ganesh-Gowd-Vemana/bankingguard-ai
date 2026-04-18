import re
import numpy as np

def extract_features(url):

    features = []

    # URL length
    features.append(len(url))

    # number of dots
    features.append(url.count('.'))

    # number of hyphens
    features.append(url.count('-'))

    # number of digits
    features.append(sum(c.isdigit() for c in url))

    # number of slashes
    features.append(url.count('/'))

    # number of question marks
    features.append(url.count('?'))

    # number of equals
    features.append(url.count('='))

    # number of @ symbols
    features.append(url.count('@'))

    # presence of https
    features.append(1 if "https" in url else 0)

    # suspicious keywords
    suspicious_keywords = [
        "login","verify","bank","secure",
        "account","update","confirm",
        "password","otp","kyc"
    ]

    keyword_flag = 0
    for word in suspicious_keywords:
        if word in url.lower():
            keyword_flag = 1
            break

    features.append(keyword_flag)

    return np.array(features)