import { CustomError } from '../errors/CustomError.js'
import { exec } from 'node:child_process'
import path from 'node:path'
import util from 'node:util'
const execAsync = util.promisify(exec)
const npmInstall = async (
  projectDir: string,
  template: string,
  installDependencies: boolean,
  viteProjectName = ''
) => {
  try {
    const frontendPath = path.join(
      projectDir,
      viteProjectName.length > 0 ? viteProjectName : 'frontend'
    )
    const backendPath = path.join(projectDir, 'backend')
    const templateApiAndFrontend = template === 'expressApi + Frontend'
    if (installDependencies) {
      await execAsync('npm install', { cwd: backendPath })

      if (templateApiAndFrontend) {
        await execAsync('npm install', { cwd: frontendPath })
      }
    }
  } catch (error) {
    const customError = new CustomError(
      'Failed installing dependencies',
      'INSTALL_DEPENDENCIES_ERROR'
    )
    throw customError
  }
}

export default npmInstall
