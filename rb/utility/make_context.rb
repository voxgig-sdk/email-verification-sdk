# EmailVerification SDK utility: make_context
require_relative '../core/context'
module EmailVerificationUtilities
  MakeContext = ->(ctxmap, basectx) {
    EmailVerificationContext.new(ctxmap, basectx)
  }
end
