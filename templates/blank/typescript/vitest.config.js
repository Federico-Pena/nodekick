import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**'],
    exclude: ['src', 'node_modules']
  }
})
