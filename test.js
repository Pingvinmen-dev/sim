import Simobs from './index'

let obs, n

beforeEach(() => {
  obs = new Simobs()
})

test('observer can be subscribed', () => {
  obs.sub(() => 42)
  expect(obs.subs.pop()()).toBe(42)
})

describe('diff', () => {
  beforeEach(() => {
    n = 0
    obs.sub(() => { ++n })
  })

  test('first state setup should not trigger notification', () => {
    obs.v(42)
    expect(n).toBe(0)
  })

  test('no deepdiff of non-objects should not trigger notification', () => {
    obs.v(42)
    obs.v(42)
    expect(n).toBe(0)
  })

  test('no diff of non-objects should not trigger notification', () => {
    obs.v(42, false)
    obs.v(42, false)
    expect(n).toBe(0)
  })

  test('diff of non-objects should trigger notification', () => {
    obs.v(42, false)
    obs.v(420, false)
    expect(n).toBe(1)
  })

  test('deepdiff of non-objects should trigger notification', () => {
    obs.v(42)
    obs.v(420)
    expect(n).toBe(1)
  })

  test('deepdiff of object keys should trigger notification', () => {
    obs.v({1: 1})
    obs.v({2: 1})
    expect(n).toBe(1)
  })

  test('deepdiff of object values should trigger notification', () => {
    obs.v({1: 1})
    obs.v({1: 2})
    expect(n).toBe(1)
  })
})
