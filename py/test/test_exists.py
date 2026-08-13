# EmailVerification SDK exists test

import pytest
from emailverification_sdk import EmailVerificationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EmailVerificationSDK.test(None, None)
        assert testsdk is not None
