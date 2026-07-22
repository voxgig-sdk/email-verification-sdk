
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EmailVerificationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EmailVerificationSDK.test()
    equal(null !== testsdk, true)
  })

})
