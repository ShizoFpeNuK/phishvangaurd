from dataclasses import dataclass, field
from typing import TypedDict


class FeatureVisualMarkDict(TypedDict):
    is_copy: bool


@dataclass
class FeaturesVisualRisk:
    is_copy: bool = False


@dataclass
class VisualRisk:
    visual_risk: float = 0
    features: FeaturesVisualRisk = field(default_factory=FeaturesVisualRisk)
