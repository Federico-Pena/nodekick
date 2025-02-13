import fs from 'node:fs/promises'
import path from 'node:path'
import { CustomError } from '../errors/CustomError.js'

const isValidFolderName = (name: string): boolean => {
  if (name.length === 0) {
    return true
  }
  const validFolderNameRegex =
    /^(?!node_modules$|favicon\.ico$)([a-z0-9]+(?:[-\.][a-z0-9]+)*){1,214}$/

  return validFolderNameRegex.test(name)
}

const validateProjectName = async (projectName: string) => {
  try {
    const currentDir = process.cwd()
    const projectDir = path.resolve(currentDir, projectName)
    const dirAlreadyExists = (await fs.readdir(currentDir)).includes(
      projectName
    )

    if (dirAlreadyExists) {
      throw new CustomError('Directory already exists!', 'INVALID_NAME_ERROR')
    }

    if (!isValidFolderName(projectName)) {
      throw new CustomError(
        'Invalid project name!',
        'INVALID_DIRECTORY_NAME_ERROR'
      )
    }

    if (projectName.length === 0) {
      return currentDir
    }

    return projectDir
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    } else {
      throw new Error('An error occurred validating project name.')
    }
  }
}
export default validateProjectName
