#!/usr/bin/env node

import { CustomError } from './errors/CustomError.js'
import inquirerAnswers from './inquierer/inquirerAnswers.js'
import { validateProjectName } from './utils/validateProjectName.js'
import copyTemplate from './commands/copyTemplate.js'
import npmInstall from './commands/npmInstall.js'
import { consoleLoader, consoleStyler } from 'logpainter'
import { successMessage } from './utils/successMessage.js'
;(async () => {
  try {
    const { projectName, language, template, installDependencies, viteName } =
      await inquirerAnswers()

    const projectDir = await validateProjectName(projectName)

    const start = performance.now()

    await consoleLoader(
      copyTemplate(language, template, projectDir, viteName),
      {
        message: 'Copying template...',
        finishMessage: 'Template copied successfully',
        emojiStart: 'hourglass_not_done',
        bold: true
      }
    )

    if (installDependencies) {
      await consoleLoader(
        npmInstall(projectDir, template, installDependencies, viteName),
        {
          message: 'Installing dependencies...',
          finishMessage: installDependencies
            ? 'Dependencies installed successfully!'
            : '',
          color: 'green',
          bold: true
        }
      )
    }

    const end = performance.now()
    const duration = parseInt(((end - start) / 1000).toFixed(2))
    process.stdout.write('\x1Bc')
    const withVite = template === 'expressApi + Frontend'
    successMessage(
      installDependencies,
      projectName,
      viteName,
      duration,
      withVite
    )
  } catch (error: any) {
    if (error instanceof CustomError) {
      consoleStyler(error.message, {
        color: 'red',
        emojiStart: 'cross_mark',
        bold: true
      })
      process.exit(1)
    } else {
      const cliError = new CustomError(error.message, 'CLI_ERROR')
      consoleStyler(cliError.message, {
        color: 'red',
        emojiStart: 'cross_mark',
        bold: true
      })
      process.exit(1)
    }
  }
})()
