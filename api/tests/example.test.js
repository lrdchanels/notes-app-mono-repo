import test, { describe, it } from 'node:test'
import assert from 'node:assert/strict'

const ping = () => 'pong'

test('ping', (_t) => {
  assert.strictEqual(ping(), 'jajajajajaj')
})

describe('suma', () => {
  it('should work', () => {
    assert.strictEqual(1, 1)
  })

  it('should be ok', () => {
    assert.strictEqual(2, 2)
  })

  describe('other context', () => {
    it('should work', () => {
      assert.strictEqual(3, 3)
    })
  })
})
