import { describe, it, expect, vi } from 'vitest'
import validateProjectName from '../src/utils/validateProjectName'
import { CustomError } from '../src/errors/CustomError.js'
import fs from 'node:fs/promises'
import path from 'node:path'

describe('validateProjectName', () => {
  const currentDir = process.cwd()

  it('should return the current directory if projectName is empty', async () => {
    const result = await validateProjectName('')
    expect(result).toBe(currentDir)
  })

  it('should throw INVALID_NAME_ERROR if the directory already exists', async () => {
    vi.spyOn(fs, 'readdir').mockResolvedValue(['existing-dir' as any])

    await expect(validateProjectName('existing-dir')).rejects.toThrowError(
      new CustomError('Directory already exists!', 'INVALID_NAME_ERROR')
    )

    vi.restoreAllMocks()
  })

  it('should throw INVALID_DIRECTORY_NAME_ERROR for invalid folder names', async () => {
    const invalidNames = ['invalid/name', '   ', 'con<>']

    for (const name of invalidNames) {
      await expect(validateProjectName(name)).rejects.toThrowError(
        new CustomError(
          'Invalid directory name!',
          'INVALID_DIRECTORY_NAME_ERROR'
        )
      )
    }
  })

  it('should return the project directory path for a valid project name', async () => {
    vi.spyOn(fs, 'readdir').mockResolvedValue([])

    const projectName = 'valid-project'
    const expectedPath = path.resolve(currentDir, projectName)
    const result = await validateProjectName(projectName)

    expect(result).toBe(expectedPath)

    vi.restoreAllMocks()
  })

  it('should handle unexpected errors gracefully', async () => {
    vi.spyOn(fs, 'readdir').mockRejectedValue(new Error('Unexpected error'))

    await expect(validateProjectName('some-project')).rejects.toThrowError(
      new Error('An error occurred validating project name.')
    )

    vi.restoreAllMocks()
  })
})
