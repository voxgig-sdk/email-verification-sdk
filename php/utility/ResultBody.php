<?php
declare(strict_types=1);

// EmailVerification SDK utility: result_body

class EmailVerificationResultBody
{
    public static function call(EmailVerificationContext $ctx): ?EmailVerificationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
