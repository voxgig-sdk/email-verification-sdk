<?php
declare(strict_types=1);

// EmailVerification SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EmailVerificationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EmailVerificationBaseFeature();
            case "test":
                return new EmailVerificationTestFeature();
            default:
                return new EmailVerificationBaseFeature();
        }
    }
}
