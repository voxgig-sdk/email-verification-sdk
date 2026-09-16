# EmailVerification SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EmailVerificationFeatures
  def self.make_feature(name)
    case name
    when "base"
      EmailVerificationBaseFeature.new
    when "ratelimit"
      EmailVerificationRatelimitFeature.new
    when "retry"
      EmailVerificationRetryFeature.new
    when "test"
      EmailVerificationTestFeature.new
    when "timeout"
      EmailVerificationTimeoutFeature.new
    else
      EmailVerificationBaseFeature.new
    end
  end
end
