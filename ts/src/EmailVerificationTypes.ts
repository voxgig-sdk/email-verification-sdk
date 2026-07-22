// Typed models for the EmailVerification SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Verify {
  credits_remaining: number
  credits_used: number
  email: string
  message: string
  result: string
  upgrade_url?: string
  valid: boolean
}

export interface VerifyLoadMatch {
  credits_remaining?: number
  credits_used?: number
  email?: string
  message?: string
  result?: string
  upgrade_url?: string
  valid?: boolean
}

