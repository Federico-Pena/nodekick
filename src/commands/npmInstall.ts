import { execSync } from 'node:child_process'
import { CustomError } from '../errors/CustomError.js'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { consoleStyler } from 'logpainter'

const npmInstall = (
  projectDir: string,
  template: string,
  installDependencies: boolean,
  viteProjectName = ''
) => {
  try {
    const frontendPath = path.join(projectDir, 'public')
    const templateApiAndFrontend = template === 'expressApi + Frontend'

    if (templateApiAndFrontend) {
      if (!existsSync(frontendPath)) {
        mkdirSync(frontendPath, { recursive: true })
      }

      const viteCommand =
        viteProjectName.trim().length > 0
          ? `npm create vite@latest ${viteProjectName}`
          : `npm create vite@latest .`

      execSync(viteCommand, {
        stdio: 'inherit',
        cwd: frontendPath
      })
      process.stdout.write('\x1Bc')
    }

    if (installDependencies) {
      consoleStyler('Installing dependencies', {
        emojiStart: 'information',
        bold: true
      })
      execSync('npm install', { stdio: 'inherit', cwd: projectDir })
      consoleStyler('Node dependencies installed', {
        color: 'green',
        emojiStart: 'check_mark_button',
        bold: true
      })
      if (templateApiAndFrontend) {
        const viteFolder = viteProjectName
          ? path.join(frontendPath, viteProjectName)
          : frontendPath
        execSync('npm install', { stdio: 'inherit', cwd: viteFolder })
        consoleStyler('Vite dependencies installed', {
          color: 'green',
          emojiStart: 'check_mark_button',
          bold: true
        })
      }
    }
  } catch (error) {
    throw new CustomError(
      'Failed to change directory or install dependencies',
      'INSTALL_DEPENDENCIES_ERROR'
    )
  }
}

export default npmInstall
