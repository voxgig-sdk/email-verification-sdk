# EmailVerification SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EmailVerificationFeatures
  def self.make_feature(name)
    case name
    when "base"
      EmailVerificationBaseFeature.new
    when "test"
      EmailVerificationTestFeature.new
    else
      EmailVerificationBaseFeature.new
    end
  end
end
