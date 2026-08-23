-- EmailVerification SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "EmailVerification",
      slug = "email-verification",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://verifymail.nanocorp.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["verify"] = {},
      },
    },
    entity = {
      ["verify"] = {
        ["fields"] = {
          {
            ["name"] = "credits_remaining",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "credits_used",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "email",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "message",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "result",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "upgrade_url",
            ["short"] = "Included when credits are low or exhausted.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
            ["req"] = true,
            ["short"] = "True when VerifyMail classifies the address as valid.",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "verify",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "user@example.com",
                      ["kind"] = "query",
                      ["name"] = "email",
                      ["orig"] = "email",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "vm_your_api_key",
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/verify",
                ["parts"] = {
                  "api",
                  "verify",
                },
                ["select"] = {
                  ["exist"] = {
                    "email",
                    "key",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
