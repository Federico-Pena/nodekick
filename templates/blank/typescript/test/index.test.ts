import { describe, it, expect, vi } from 'vitest'
import { helloWorld } from '../src/index.js'

vi.spyOn(console, 'log')

describe('helloWorld', () => {
  it('should called console.log with "Hello World!!!', () => {
    helloWorld('Hello World!!!')
    expect(console.log).toHaveBeenCalledWith('Hello World!!!')
  })
})
