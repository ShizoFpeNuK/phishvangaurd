import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from joblib import dump

from src.modules.module_url.constants import PHISH_PATH
from src.modules.module_url.utils import extract_features


df = pd.read_csv(PHISH_PATH)

df = df[df["status"].isin(["phishing", "legitimate"])]
df["url"] = df["url"].astype(str)

df["label"] = df["status"].apply(lambda x: 1 if x == "phishing" else 0)

feature_rows = []
for _, row in df.iterrows():
    features = extract_features(row["url"])
    features["label"] = row["label"]
    feature_rows.append(features)

features_df = pd.DataFrame(feature_rows)
X = features_df.drop("label", axis=1)
y = features_df["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

dump(clf, "src/modules/module_url/model.pkl")

print(classification_report(y_test, clf.predict(X_test)))
