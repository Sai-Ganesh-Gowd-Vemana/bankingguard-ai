import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score


# ============================
# LOAD DATASET
# ============================

df = pd.read_csv("datasets/sms_spam.csv", encoding="latin-1")

# Keep only needed columns
df = df[['v1','v2']]
df.columns = ["label","message"]


# ============================
# SPLIT FEATURES & LABELS
# ============================

X = df["message"]
y = df["label"]


# ============================
# TRAIN / TEST SPLIT
# ============================

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# ============================
# TEXT VECTORIZATION
# ============================

vectorizer = TfidfVectorizer(stop_words="english")

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)


# ============================
# TRAIN MODEL
# ============================

model = MultinomialNB()

model.fit(X_train_vec, y_train)


# ============================
# TEST MODEL
# ============================

predictions = model.predict(X_test_vec)

accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)


# ============================
# SAVE MODEL
# ============================

pickle.dump(model, open("models/spam_model.pkl","wb"))
pickle.dump(vectorizer, open("models/tfidf_vectorizer.pkl","wb"))

print("SMS spam model trained successfully")