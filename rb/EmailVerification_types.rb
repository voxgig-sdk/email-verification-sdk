# frozen_string_literal: true

# Typed models for the EmailVerification SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Verify entity data model.
#
# @!attribute [rw] credits_remaining
#   @return [Integer]
#
# @!attribute [rw] credits_used
#   @return [Integer]
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] result
#   @return [String]
#
# @!attribute [rw] upgrade_url
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean]
Verify = Struct.new(
  :credits_remaining,
  :credits_used,
  :email,
  :message,
  :result,
  :upgrade_url,
  :valid,
  keyword_init: true
)

# Request payload for Verify#load.
#
# @!attribute [rw] credits_remaining
#   @return [Integer, nil]
#
# @!attribute [rw] credits_used
#   @return [Integer, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [String, nil]
#
# @!attribute [rw] upgrade_url
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
VerifyLoadMatch = Struct.new(
  :credits_remaining,
  :credits_used,
  :email,
  :message,
  :result,
  :upgrade_url,
  :valid,
  keyword_init: true
)

