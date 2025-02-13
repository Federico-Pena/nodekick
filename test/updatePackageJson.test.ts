import { describe, it, expect, vi, afterEach } from 'vitest'
import updatePackageJson from '../src/commands/updatePackageJson'
import fs from 'node:fs/promises'
import path from 'node:path'
import { CustomError } from '../src/errors/CustomError.js'

describe('updatePackageJson', () => {
  const mockProjectDir = '/mock/project'
  const mockPackageJsonPath = path.join(mockProjectDir, 'package.json')
  const mockPackageJsonContent = JSON.stringify({ name: 'old-name' }, null, 2)

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should update the package.json name with the provided projectName', async () => {
    const mockProjectName = 'My Project'

    vi.spyOn(fs, 'readFile').mockResolvedValue(mockPackageJsonContent)
    const writeFileMock = vi.spyOn(fs, 'writeFile').mockResolvedValue()

    await updatePackageJson(mockProjectDir, mockProjectName)

    expect(writeFileMock).toHaveBeenCalledWith(
      mockPackageJsonPath,
      JSON.stringify({ name: 'my-project' }, null, 2)
    )
  })

  it('should update the package.json name based on the projectDir basename if projectName is empty', async () => {
    const mockProjectName = ''
    const mockBasename = 'Mock Project'

    vi.spyOn(path, 'basename').mockReturnValue(mockBasename)
    vi.spyOn(fs, 'readFile').mockResolvedValue(mockPackageJsonContent)
    const writeFileMock = vi.spyOn(fs, 'writeFile').mockResolvedValue()

    await updatePackageJson(mockProjectDir, mockProjectName)

    expect(writeFileMock).toHaveBeenCalledWith(
      mockPackageJsonPath,
      JSON.stringify({ name: 'mock-project' }, null, 2)
    )
  })

  it('should throw UPDATE_PACKAGE_JSON_ERROR if package.json does not exist', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValue(new Error('File not found'))

    await expect(
      updatePackageJson(mockProjectDir, 'Project Name')
    ).rejects.toThrowError(
      new CustomError(
        'Error updating package.json',
        'UPDATE_PACKAGE_JSON_ERROR'
      )
    )
  })

  it('should throw UPDATE_PACKAGE_JSON_ERROR if there is an unexpected error', async () => {
    vi.spyOn(fs, 'readFile').mockRejectedValue(new Error('Unexpected error'))

    await expect(
      updatePackageJson(mockProjectDir, 'Project Name')
    ).rejects.toThrowError(
      new CustomError(
        'Error updating package.json',
        'UPDATE_PACKAGE_JSON_ERROR'
      )
    )
  })
})
