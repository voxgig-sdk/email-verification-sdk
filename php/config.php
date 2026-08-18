<?php
declare(strict_types=1);

// EmailVerification SDK configuration

class EmailVerificationConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "EmailVerification",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://verifymail.nanocorp.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "verify" => [],
                ],
            ],
            "entity" => [
        'verify' => [
          'fields' => [
            [
              'name' => 'credits_remaining',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'credits_used',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'email',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'upgrade_url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'verify',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'user@example.com',
                        'kind' => 'query',
                        'name' => 'email',
                        'orig' => 'email',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'vm_your_api_key',
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/verify',
                  'parts' => [
                    'api',
                    'verify',
                  ],
                  'select' => [
                    'exist' => [
                      'email',
                      'key',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EmailVerificationFeatures::make_feature($name);
    }
}
