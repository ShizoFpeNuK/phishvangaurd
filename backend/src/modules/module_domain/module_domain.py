from typing import Any
from urllib.parse import urlparse
import whois
from datetime import datetime

from src.utils.parse_date import parse_dirty_date
from src.modules.calc_risk.classes import PhishingReport
from src.modules.module_domain.classes import FeatureDomainDict
from src.modules.module_domain.constants import HIDDEN_KEYWORDS


def get_age(domain_info: Any) -> datetime:
    if domain_info is None:
        return datetime.now().day

    creation_date = domain_info.creation_date

    if isinstance(creation_date, str):
        creation_date = parse_dirty_date(creation_date)

    if isinstance(creation_date, list):
        if isinstance(creation_date, str):
            creation_date = parse_dirty_date(creation_date)

        return (datetime.now() - creation_date[0]).days

    return (datetime.now() - creation_date).days


# TODO: Переписать под получение списка полей
def is_info_hidden(field: str | list[str]):
    if field is None:
        return True

    if isinstance(field, list):
        field = " ".join(field).lower()
    else:
        field = str(field).lower()

    for keyword in HIDDEN_KEYWORDS:
        if keyword.lower() in field:
            return True

    return False


def check_hidden_whois_info(domain_info: Any) -> bool:
    if domain_info is None:
        return False

    if is_info_hidden(domain_info.get("name")):
        return True
    if is_info_hidden(domain_info.get("address")):
        return True
    if is_info_hidden(domain_info.get("emails")):
        return True
    if is_info_hidden(domain_info.get("registrar")):
        return True
    if is_info_hidden(domain_info.get("org")):
        return True
    if is_info_hidden(domain_info.get("address")):
        return True
    if is_info_hidden(domain_info.get("name_servers")):
        return True

    return False


# Нет бесплатных
# def check_reputation(domain: str) -> bool:
#     try:
#         response = requests.get(f"https://www.someblacklistapi.com/check/{domain}")
#         if response.json().get("blacklisted", False):  # Пример ответа API
#             return True
#     except requests.RequestException as e:
#         print(f"Ошибка при запросе репутации для домена {domain}: {e}")
#     return False


def extract_features(url: str) -> FeatureDomainDict:
    domain = urlparse(url).netloc
    domain_info = None

    try:
        domain_info = whois.whois(domain)
    except Exception as e:
        print(f"Ошибка при получении данных WHOIS для домена {domain}: {e}")

    # Что делать, когда нет такого домена?..
    features: FeatureDomainDict = {
        "age": get_age(domain_info),
        "hidden_whois_info": check_hidden_whois_info(domain_info),
        # "reputation": check_reputation(domain),
    }

    return features


def risk_calculation(features: FeatureDomainDict) -> int | float:
    ONE_MONTH = 30
    THREE_MONTH = 90
    score = 0.0

    if features["age"] < ONE_MONTH:
        print("Признак: Возраст домена меньше месяца.")
        score += 0.3
    elif features["age"] < THREE_MONTH:
        print("Признак: Возраст домена меньше 3-х месяцев.")
        score += 0.2
    if features["hidden_whois_info"]:
        print("Признак: Имеется скрытая информация.")
        score += 0.2

    return score


def module_domain(url: str, report: PhishingReport | None = None) -> PhishingReport:
    features = extract_features(url)
    score = risk_calculation(features)

    if report is None:
        return PhishingReport(domain_risk=score)
    else:
        report.domain_risk = score
        return report
