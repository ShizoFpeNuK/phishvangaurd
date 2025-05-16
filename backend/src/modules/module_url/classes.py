from dataclasses import dataclass, field
from typing import TypedDict


class FeatureUrlDict(TypedDict):
    url_length: int
    has_ip: bool
    has_https: bool
    num_subdomains: int
    suspicious_words: bool
    has_at_symbol: bool
    has_dash: bool
    suspicious_tld: bool
    imitation_domain: bool


@dataclass
class FeaturesUrlRisk:
    is_length: bool = False
    has_ip: bool = False
    has_not_https: bool = False
    has_subdomains: bool = False
    has_suspicious_words: bool = False
    has_at_symbol: bool = False
    has_dash: bool = False
    has_suspicious_tld: bool = False
    is_imitation: bool = False


@dataclass
class UrlRisk:
    url_risk: float = 0
    features: FeaturesUrlRisk = field(default_factory=FeaturesUrlRisk)
