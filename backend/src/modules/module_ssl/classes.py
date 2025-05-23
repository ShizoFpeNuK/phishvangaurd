from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, TypedDict


class CertificateDict(TypedDict):
    issuer: Any
    subject: Any
    not_before: datetime
    not_after: datetime
    domain_cert: str | bytes
    extensions: Any


class FeatureSslDict(TypedDict):
    self_signed: bool
    short_dated: bool
    domain_mismatch: bool
    expired: bool
    dv_type: bool


@dataclass
class FeaturesSslRisk:
    is_self_signed: bool = False
    is_short_dated: bool = False
    is_domain_mismatch: bool = False
    is_expired: bool = False
    is_dv_type: bool = False


@dataclass
class SslRisk:
    ssl_risk: float = 0
    features: FeaturesSslRisk = field(default_factory=FeaturesSslRisk)
