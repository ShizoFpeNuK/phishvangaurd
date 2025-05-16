from dataclasses import dataclass, field
from typing import TypedDict


class FeatureDomainDict(TypedDict):
    age: int | float
    hidden_whois_info: bool


@dataclass
class FeaturesDomainRisk:
    is_new: bool = False
    is_latest: bool = False
    is_hidden_info: bool = False


@dataclass
class DomainRisk:
    domain_risk: float = 0
    features: FeaturesDomainRisk = field(default_factory=FeaturesDomainRisk)
