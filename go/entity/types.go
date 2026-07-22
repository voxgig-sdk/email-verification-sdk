// Typed models for the EmailVerification SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Verify is the typed data model for the verify entity.
type Verify struct {
	CreditsRemaining int `json:"credits_remaining"`
	CreditsUsed int `json:"credits_used"`
	Email string `json:"email"`
	Message string `json:"message"`
	Result string `json:"result"`
	UpgradeUrl *string `json:"upgrade_url,omitempty"`
	Valid bool `json:"valid"`
}

// VerifyLoadMatch is the typed request payload for Verify.LoadTyped.
type VerifyLoadMatch struct {
	CreditsRemaining *int `json:"credits_remaining,omitempty"`
	CreditsUsed *int `json:"credits_used,omitempty"`
	Email *string `json:"email,omitempty"`
	Message *string `json:"message,omitempty"`
	Result *string `json:"result,omitempty"`
	UpgradeUrl *string `json:"upgrade_url,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
