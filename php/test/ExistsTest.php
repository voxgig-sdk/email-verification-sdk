<?php
declare(strict_types=1);

// EmailVerification SDK exists test

require_once __DIR__ . '/../emailverification_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EmailVerificationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
