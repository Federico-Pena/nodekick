import fs from 'node:fs/promises'
import path from 'node:path'
import { CustomError } from '../errors/CustomError.js'

const updatePackageJson = async (projectDir: string, projectName: string) => {
  try {
    const packageJsonPath = path.join(projectDir, 'package.json')
    const packageJsonfile = await fs.readFile(packageJsonPath, 'utf-8')
    if (packageJsonfile) {
      const packageJson = JSON.parse(packageJsonfile)
      if (projectName.length === 0) {
        const name = path
          .basename(projectDir)
          .split(' ')
          .join('-')
          .toLowerCase()
        packageJson.name = name
      } else {
        const name = projectName.split(' ').join('-').toLowerCase()
        packageJson.name = name
      }
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
    } else {
      throw new CustomError(
        'Error updating package.json',
        'UPDATE_PACKAGE_JSON_ERROR'
      )
    }
  } catch (error) {
    throw new CustomError(
      'Error updating package.json',
      'UPDATE_PACKAGE_JSON_ERROR'
    )
  }
}
export default updatePackageJson
