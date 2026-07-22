<?php
declare(strict_types=1);

// EmailVerification SDK utility: prepare_body

class EmailVerificationPrepareBody
{
    public static function call(EmailVerificationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
