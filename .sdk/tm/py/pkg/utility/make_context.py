# EmailVerification SDK utility: make_context

from projectname_sdk.core.context import EmailVerificationContext


def make_context_util(ctxmap, basectx):
    return EmailVerificationContext(ctxmap, basectx)
