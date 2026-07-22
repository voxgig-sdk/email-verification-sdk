# EmailVerification SDK exists test

require "minitest/autorun"
require_relative "../EmailVerification_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EmailVerificationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
