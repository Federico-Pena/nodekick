import type { CustomErrorTypes } from '../types.js'

export class CustomError extends Error {
  public code: CustomErrorTypes

  constructor(message: string, code: CustomErrorTypes) {
    super(message)
    this.name = 'NODEKICK_ERROR'
    this.code = code
  }
}
