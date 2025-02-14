import { execSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import type { Answers } from '../types.js'

export const initVite = (
  projectDir: string,
  viteProjectName: Answers['viteName'] = ''
) => {
  const viteName = viteProjectName.trim().length > 0
  const frontendPath = path.join(
    projectDir,
    viteName ? viteProjectName : 'frontend'
  )
  if (!existsSync(frontendPath)) {
    mkdirSync(frontendPath, { recursive: true })
  }
  const viteCommand =
    viteProjectName.trim().length > 0
      ? `npm create vite@latest ${viteProjectName}`
      : `npm create vite@latest .`

  execSync(viteCommand, {
    stdio: 'inherit',
    cwd: viteName ? projectDir : frontendPath
  })
  process.stdout.write('\x1Bc')
}
