import pandas as pd
import pickle
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from url_features import extract_features


# =========================
# LOAD DATASET
# =========================

df = pd.read_csv("datasets/phishing_urls.csv")

df.columns = ["url","label"]


# =========================
# FEATURE EXTRACTION
# =========================

X = []

for url in df["url"]:
    features = extract_features(url)
    X.append(features)

X = np.array(X)

y = df["label"].map({"good":0,"bad":1})


# =========================
# TRAIN TEST SPLIT
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)


# =========================
# TRAIN MODEL
# =========================

model = RandomForestClassifier(
    n_estimators=50,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=3,
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

pickle.dump(model,open("models/url_model.pkl","wb"))

print("URL phishing model trained successfully")