# EmailVerification SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "EmailVerification",
            "slug": "email-verification",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://verifymail.nanocorp.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "verify": {},
            },
        },
        "entity": {
      "verify": {
        "fields": [
          {
            "name": "credits_remaining",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "credits_used",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "email",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "result",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "upgrade_url",
            "short": "Included when credits are low or exhausted.",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "req": True,
            "short": "True when VerifyMail classifies the address as valid.",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "verify",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "user@example.com",
                      "kind": "query",
                      "name": "email",
                      "orig": "email",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "vm_your_api_key",
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/verify",
                "parts": [
                  "api",
                  "verify",
                ],
                "select": {
                  "exist": [
                    "email",
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
