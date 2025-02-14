import inquirer from 'inquirer'
import type { InquirerAnswers } from '../types.js'
import { CustomError } from '../errors/CustomError.js'
import { isValidFolderName } from '../utils/validateProjectName.js'

const inquirerAnswers: InquirerAnswers = async () => {
  try {
    const { projectName, language, template } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name (leave empty to use the current directory)',
        validate: (value) => {
          if (!isValidFolderName(value)) {
            return 'Project name is invalid'
          }
          return true
        }
      },
      {
        type: 'list',
        name: 'language',
        message: 'What language do you want to use?',
        choices: [
          { name: 'TypeScript', value: 'TypeScript' },
          { name: 'JavaScript', value: 'JavaScript' }
        ]
      },
      {
        type: 'list',
        name: 'template',
        message: 'What template do you want to use?',
        choices: [
          { name: 'Blank', value: 'blank' },
          { name: 'Express API', value: 'expressApi' },
          {
            name: 'Express API + Frontend (Vite)',
            value: 'expressApi + Frontend'
          }
        ]
      }
    ])
    let viteName = ''
    if (template === 'expressApi + Frontend') {
      const { viteProjectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'viteProjectName',
          message: 'Vite project name (leave empty to use the frontend folder)',
          validate: (value) => {
            if (value.trim() === 'backend') {
              return 'Vite project name cannot be backend'
            }
            return true
          }
        }
      ])
      viteName = viteProjectName
    }
    const { installDependencies } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Do you want to install dependencies with npm?'
      }
    ])
    return {
      projectName,
      language,
      template,
      installDependencies,
      viteName
    }
  } catch (error) {
    throw new CustomError('Failed to get answers from user', 'INQUIRER_ERROR')
  }
}

export default inquirerAnswers
