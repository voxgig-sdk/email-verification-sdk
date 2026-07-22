<?php
declare(strict_types=1);

// EmailVerification SDK utility: result_headers

class EmailVerificationResultHeaders
{
    public static function call(EmailVerificationContext $ctx): ?EmailVerificationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
