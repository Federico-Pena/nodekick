// If you want export types, you can do it like this:
// export * from './types.js'
// export type * from './types.js'
import type { HelloWorld } from './types.js'

export const helloWorld: HelloWorld = (msg) => {
  console.log(msg)
}

helloWorld('Hello World!!!')
