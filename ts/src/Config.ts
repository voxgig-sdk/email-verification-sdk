
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'EmailVerification',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://verifymail.nanocorp.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      verify: {
      },

    }
  }


  entity = {
    "verify": {
      "fields": [
        {
          "name": "credits_remaining",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "credits_used",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "email",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "message",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "result",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "upgrade_url",
          "type": "`$STRING`"
        },
        {
          "name": "valid",
          "req": true,
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "vm_your_api_key",
                    "kind": "query",
                    "name": "key",
                    "orig": "key",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/verify",
              "parts": [
                "api",
                "verify"
              ],
              "select": {
                "exist": [
                  "email",
                  "key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

