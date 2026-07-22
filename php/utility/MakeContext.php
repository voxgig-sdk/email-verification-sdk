<?php
declare(strict_types=1);

// EmailVerification SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EmailVerificationMakeContext
{
    public static function call(array $ctxmap, ?EmailVerificationContext $basectx): EmailVerificationContext
    {
        return new EmailVerificationContext($ctxmap, $basectx);
    }
}
