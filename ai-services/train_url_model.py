import pandas as pd
import pickle
import numpy as np

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.utils import shuffle
import joblib

from url_features import extract_features


# =========================
# LOAD DATASET
# =========================

df = pd.read_csv("datasets/phishing_urls.csv")

df.columns = ["url","label"]



# =========================
# FEATURE EXTRACTION
# =========================

from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack

# ===== TF-IDF FEATURES =====
tfidf = TfidfVectorizer(max_features=300)
X_text = tfidf.fit_transform(df["url"])

# ===== NUMERIC FEATURES =====
X_num = np.array([extract_features(url) for url in df["url"]])

# ===== COMBINE BOTH =====
X = hstack((X_text, X_num))

y = df["label"].map({"good":0,"bad":1})

# =========================
# TRAIN TEST SPLIT
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,   # 🔥 important
    random_state=42
)

# =========================
# TRAIN MODEL
# =========================

model = RandomForestClassifier(
    n_estimators=60,
    max_depth=15,
    min_samples_split=6,
    min_samples_leaf=2,
    max_features="sqrt",
    class_weight="balanced",   # 🔥 important
    random_state=42
)
model.fit(X_train,y_train)


# =========================
# TEST MODEL
# =========================

pred = model.predict(X_test)

accuracy = accuracy_score(y_test,pred)

print("URL Detection Accuracy:",accuracy)


# =========================
# SAVE MODEL
# =========================


joblib.dump(model, "models/url_model.pkl", compress=3)
joblib.dump(tfidf, "models/tfidf_url.pkl")

print("URL phishing Model trained and TFIDF saved successfully")

