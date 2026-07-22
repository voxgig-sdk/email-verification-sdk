<?php
declare(strict_types=1);

// EmailVerification SDK base feature

class EmailVerificationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EmailVerificationContext $ctx, array $options): void {}
    public function PostConstruct(EmailVerificationContext $ctx): void {}
    public function PostConstructEntity(EmailVerificationContext $ctx): void {}
    public function SetData(EmailVerificationContext $ctx): void {}
    public function GetData(EmailVerificationContext $ctx): void {}
    public function GetMatch(EmailVerificationContext $ctx): void {}
    public function SetMatch(EmailVerificationContext $ctx): void {}
    public function PrePoint(EmailVerificationContext $ctx): void {}
    public function PreSpec(EmailVerificationContext $ctx): void {}
    public function PreRequest(EmailVerificationContext $ctx): void {}
    public function PreResponse(EmailVerificationContext $ctx): void {}
    public function PreResult(EmailVerificationContext $ctx): void {}
    public function PreDone(EmailVerificationContext $ctx): void {}
    public function PreUnexpected(EmailVerificationContext $ctx): void {}
}
