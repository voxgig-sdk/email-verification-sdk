# EmailVerification SDK feature factory

from feature.base_feature import EmailVerificationBaseFeature
from feature.test_feature import EmailVerificationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EmailVerificationBaseFeature(),
        "test": lambda: EmailVerificationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
