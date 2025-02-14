import { consoleStyler } from 'logpainter'

export const successMessage = (
  installDependencies: boolean,
  projectName: string = '',
  viteName: string,
  duration: number,
  withVite: boolean
) => {
  const cdPath = (subpath: string) => {
    return projectName.length > 0
      ? `cd ${projectName}/${subpath}`
      : `cd ${subpath}`
  }

  consoleStyler(`Project ready in ${duration} seconds!`, {
    color: 'green',
    emojiStart: 'check_mark_button',
    bold: true
  })
  console.log()

  consoleStyler(`To start run the following commands:`, {
    emojiStart: 'backhand_index_pointing_down',
    color: 'blue'
  })
  console.log()

  consoleStyler(`For Node`, {
    color: 'blue',
    bold: true
  })
  consoleStyler(cdPath('backend'), {
    color: 'green',
    indent: 1
  })
  if (!installDependencies) {
    consoleStyler('npm install', {
      color: 'green',
      indent: 1
    })
  }
  consoleStyler('npm run dev', {
    color: 'green',
    indent: 1
  })

  if (withVite) {
    const viteFolder = viteName || 'frontend'
    console.log()
    consoleStyler(`For Vite`, {
      color: 'blue',
      bold: true
    })
    consoleStyler(cdPath(viteFolder), {
      color: 'green',
      indent: 1
    })
    if (!installDependencies) {
      consoleStyler('npm install', {
        color: 'green',
        indent: 1
      })
    }
    consoleStyler('npm run dev', {
      color: 'green',
      indent: 1
    })
  }
  console.log()
}
