# EmailVerification SDK configuration

module EmailVerificationConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "EmailVerification",
        "slug" => "email-verification",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://verifymail.nanocorp.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "verify" => {},
        },
      },
      "entity" => {
        "verify" => {
          "fields" => [
            {
              "name" => "credits_remaining",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "credits_used",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "result",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "upgrade_url",
              "short" => "Included when credits are low or exhausted.",
              "type" => "`$STRING`",
            },
            {
              "name" => "valid",
              "req" => true,
              "short" => "True when VerifyMail classifies the address as valid.",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "verify",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "user@example.com",
                        "kind" => "query",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "vm_your_api_key",
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/verify",
                  "parts" => [
                    "api",
                    "verify",
                  ],
                  "select" => {
                    "exist" => [
                      "email",
                      "key",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EmailVerificationFeatures.make_feature(name)
  end
end
