# Подозрительные ключевые слова в URL
SUSPICIOUS_KEYWORDS = [
    "login",
    "verify",
    "update",
    "secure",
    "account",
    "webscr",
    "banking",
    "signin",
    "confirm",
]
# Подозрительные домены/расширения
SUSPICIOUS_TLDS = [".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top"]

OBFUSCATION_MAP = {
    "0": ["o", "о"],
    "o": ["0", "о"],
    "1": ["i", "l", "I"],
    "i": ["l", "I", "1"],
    "l": ["1", "I"],
    "3": ["e", "е"],
    "5": ["s"],
    "@": ["a", "а"],
    "|": ["l", "I"],
    "s": ["5"],
    "e": ["3", "е"],
    "а": ["а", "@"],
}

PHISH_PATH = "src/modules/module_url/datasets/phishing_train.csv"
LEGIT_DOMAINS_PATH = "src/modules/module_url/datasets/legitimate.csv"
MODEL_PATH = "src/modules/module_url/model/model.pkl"
