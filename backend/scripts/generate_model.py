from pathlib import Path
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder

# TODO: Под снос

# Загрузка данных
data = pd.read_csv(Path("datasets/dirty/dataset_phishing.csv"))

# Предобработка URL (например, извлечь доменное имя или использовать текстовый векторизатор)
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(data["url"])

# Кодируем метки (легитимные/фишинговые)
encoder = LabelEncoder()
y = encoder.fit_transform(data["status"])  # 0 для легитимных, 1 для фишинговых

# Разделяем данные на обучающие и тестовые
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Инициализация модели
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Обучение модели
model.fit(X_train, y_train)

# Предсказание на тестовых данных
y_pred = model.predict(X_test)

# Оценка модели
print(classification_report(y_test, y_pred))

joblib.dump(model, "model_vector.pkl", compress=("xz", 9))
