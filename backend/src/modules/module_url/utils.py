import re
import difflib
import itertools
from functools import lru_cache
from urllib.parse import urlparse
import pandas as pd

from src.modules.module_url.classes import FeatureUrlDict
from src.modules.module_url.constants import LEGIT_DOMAINS_PATH, OBFUSCATION_MAP, SUSPICIOUS_KEYWORDS, SUSPICIOUS_TLDS


@lru_cache(maxsize=1)
def get_legit_domains():
    df = pd.read_csv(LEGIT_DOMAINS_PATH, nrows=100)
    return tuple(df.iloc[:, 0].dropna().unique())


# def load_legit_domains(path: str) -> list[str]:
#     df = pd.read_csv(path, nrows=100)
#     return df.iloc[:, 0].dropna().unique().tolist()


def is_obfuscated_imitation(domain: str, legit_domains: list[str], threshold=0.8) -> bool:
    if domain in legit_domains:
        return False

    MAX_COMBINATIONS = 10
    possible_replacements = []

    for char in domain:
        if char in OBFUSCATION_MAP:
            possible_replacements.append(OBFUSCATION_MAP[char])
        else:
            possible_replacements.append([char])

    substituted_domains = []
    for i, combination in enumerate(itertools.product(*possible_replacements)):
        if i >= MAX_COMBINATIONS:
            break
        substituted_domains.append("".join(combination))

    for fake in substituted_domains:
        for legit in legit_domains:
            if difflib.SequenceMatcher(None, fake, legit).ratio() >= threshold:
                return True
    return False


def extract_features(url: str) -> FeatureUrlDict:
    domain = urlparse(url).netloc.lower()

    features = {
        "url_length": len(url),
        "has_ip": bool(re.match(r"https?://\d+\.\d+\.\d+\.\d+", url)),
        "has_https": url.startswith("https://"),
        "num_subdomains": domain.count(".") - 1,
        "suspicious_words": any(word for word in SUSPICIOUS_KEYWORDS if word in url.lower()),
        "has_at_symbol": "@" in url,
        "has_dash": "-" in domain,
        "suspicious_tld": any(domain.endswith(tld) for tld in SUSPICIOUS_TLDS),
        "imitation_domain": is_obfuscated_imitation(domain, get_legit_domains()),
    }

    return features
