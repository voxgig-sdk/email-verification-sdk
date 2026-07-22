
import { Context } from './Context'


class EmailVerificationError extends Error {

  isEmailVerificationError = true

  sdk = 'EmailVerification'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EmailVerificationError
}

