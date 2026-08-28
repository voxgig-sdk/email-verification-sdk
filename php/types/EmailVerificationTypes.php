<?php
declare(strict_types=1);

// Typed models for the EmailVerification SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Verify entity data model. */
class Verify
{
    public int $credits_remaining;
    public int $credits_used;
    public string $email;
    public string $message;
    public string $result;
    public ?string $upgrade_url = null;
    public bool $valid;
}

/** Request payload for Verify#load. */
class VerifyLoadMatch
{
    public string $email;
    public string $key;
}

