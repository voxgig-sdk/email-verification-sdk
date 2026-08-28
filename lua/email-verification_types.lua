-- Typed models for the EmailVerification SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Verify
---@field credits_remaining number
---@field credits_used number
---@field email string
---@field message string
---@field result string
---@field upgrade_url? string
---@field valid boolean

---@class VerifyLoadMatch
---@field email string
---@field key string

local M = {}

return M
