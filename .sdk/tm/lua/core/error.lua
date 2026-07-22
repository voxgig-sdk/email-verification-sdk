-- EmailVerification SDK error

local EmailVerificationError = {}
EmailVerificationError.__index = EmailVerificationError


function EmailVerificationError.new(code, msg, ctx)
  local self = setmetatable({}, EmailVerificationError)
  self.is_sdk_error = true
  self.sdk = "EmailVerification"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EmailVerificationError:error()
  return self.msg
end


function EmailVerificationError:__tostring()
  return self.msg
end


return EmailVerificationError
