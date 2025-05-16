from dataclasses import field
from pydantic import BaseModel

from src.modules.module_url.classes import UrlRisk
from src.modules.module_visual.classes import VisualRisk
from src.modules.module_domain.classes import DomainRisk
from src.modules.module_ssl.classes import SslRisk


class PhishingReport(BaseModel):
    url: UrlRisk = field(default_factory=UrlRisk)
    domain: DomainRisk = field(default_factory=DomainRisk)
    ssl: SslRisk = field(default_factory=SslRisk)
    visual: VisualRisk = field(default_factory=VisualRisk)

    def get_risk_scores(self):
        return (
            self.url.url_risk,
            self.domain.domain_risk,
            self.ssl.ssl_risk,
            self.visual.visual_risk,
        )
