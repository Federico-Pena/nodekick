/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    exclude: ['./templates', './dist', './out', './node_modules'],
    include: ['./test/**/*.test.ts']
  }
})
