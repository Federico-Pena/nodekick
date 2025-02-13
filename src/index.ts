#!/usr/bin/env node

import { CustomError } from './errors/CustomError.js'
import inquirerAnswers from './inquierer/inquirerAnswers.js'
import validateProjectName from './utils/validateProjectName.js'
import copyTemplate from './commands/copyTemplate.js'
import updatePackageJson from './commands/updatePackageJson.js'
import npmInstall from './commands/npmInstall.js'
import { consoleStyler } from 'logpainter'
;(async () => {
  try {
    const { projectName, language, template, installDependencies, viteName } =
      await inquirerAnswers()

    const projectDir = await validateProjectName(projectName)

    const start = performance.now()
    await copyTemplate(language, template, projectDir)
    await updatePackageJson(projectDir, projectName)
    consoleStyler('Project copied successfully', {
      color: 'green',
      emojiStart: 'check_mark_button',
      bold: true
    })
    npmInstall(projectDir, template, installDependencies, viteName)
    const end = performance.now()
    const duration = ((end - start) / 1000).toFixed(2)
    console.log()
    consoleStyler(`Proyect ready in ${duration} seconds!`, {
      color: 'green',
      emojiStart: 'check_mark_button',
      bold: true
    })
    console.log()
    consoleStyler('Happy coding!')
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
