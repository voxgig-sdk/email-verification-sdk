package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewVerifyEntityFunc func(client *EmailVerificationSDK, entopts map[string]any) EmailVerificationEntity

