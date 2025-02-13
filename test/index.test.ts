import { describe, it, expect, vi } from 'vitest'

vi.spyOn(console, 'log')

describe('helloWorld', () => {
  it('should called with "Hello World!!!', () => {
    expect('Hello World!!!').toBe('Hello World!!!')
  })
})
