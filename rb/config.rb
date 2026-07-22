# EmailVerification SDK configuration

module EmailVerificationConfig
  def self.make_config
    {
      "main" => {
        "name" => "EmailVerification",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "active" => true,
              "name" => "credits_remaining",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "credits_used",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "email",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "result",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "upgrade_url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "valid",
              "req" => true,
              "type" => "`$BOOLEAN`",
              "index$" => 6,
            },
          ],
          "name" => "verify",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "user@example.com",
                        "kind" => "query",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => "vm_your_api_key",
                        "kind" => "query",
                        "name" => "key",
                        "orig" => "key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
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
                  "index$" => 0,
                },
              ],
              "key$" => "load",
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
