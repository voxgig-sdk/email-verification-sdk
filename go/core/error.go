package core

type EmailVerificationError struct {
	IsEmailVerificationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEmailVerificationError(code string, msg string, ctx *Context) *EmailVerificationError {
	return &EmailVerificationError{
		IsEmailVerificationError: true,
		Sdk:              "EmailVerification",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EmailVerificationError) Error() string {
	return e.Msg
}
