import path from 'node:path'
import fs from 'fs/promises'
import { CustomError } from '../errors/CustomError.js'
import { fileURLToPath } from 'node:url'
import type { Answers } from '../types.js'
import { initVite } from './initVite.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const copyTemplate = async (
  language: Answers['language'],
  template: Answers['template'],
  destDir: string,
  viteName: string
): Promise<void> => {
  try {
    const templateFolder = template === 'blank' ? 'blank' : 'api'
    const templateLenguage =
      language === 'TypeScript' ? 'typescript' : 'javascript'

    const templateApiAndFrontend = template === 'expressApi + Frontend'

    const srcDir = path.join(
      __dirname,
      '..',
      '..',
      'templates',
      templateFolder,
      templateLenguage
    )

    const entries = await fs.readdir(srcDir, { withFileTypes: true })
    let skippedPublic = false

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name)
      const destPath = path.join(destDir, entry.name)
      if (templateApiAndFrontend && entry.name === 'frontend') {
        skippedPublic = true
        continue
      }
      await fs.cp(srcPath, destPath, { recursive: true })
    }
    if (skippedPublic) {
      const appFilePath = path.join(
        destDir,
        'backend',
        'src',
        'app',
        `${language === 'JavaScript' ? 'app.js' : 'app.ts'}`
      )
      await updateTemplateFilesToVite(appFilePath, language, viteName)
    }
    if (template === 'expressApi + Frontend') {
      initVite(destDir, viteName)
    }
  } catch (error) {
    throw new CustomError('Error copying files.', 'COPY_TEMPLATE_ERROR')
  }
}

const updateTemplateFilesToVite = async (
  appFilePath: string,
  language: Answers['language'],
  viteName: string
) => {
  try {
    let appFileContent = await fs.readFile(appFilePath, 'utf8')
    const expressStaticPath = `path.join(cwd(),"../", '${
      viteName.trim().length > 0 ? viteName : 'frontend'
    }', "dist")`
    const expressError404Line = `app.get('*', ${
      language === 'JavaScript' ? '(req, res)' : '(req: Request, res: Response)'
    } => {
res.sendFile(path.join(staticPath, 'index.html'))
})`

    let lines = appFileContent.split('\n')
    lines = lines.map((line) => {
      if (line.includes("app.use('*',")) {
        return line.replace(line, expressError404Line)
      }
      if (line.includes('const staticPath')) {
        return line.replace(line, `const staticPath = ${expressStaticPath}`)
      }
      if (line.includes('404.html') || line.includes('})')) {
        return line.replace(line, '')
      }

      return line
    })

    appFileContent = lines.join('\n')

    await fs.writeFile(appFilePath, appFileContent, 'utf8')
  } catch (error) {
    console.log(error)
    throw new CustomError('Error modifying app file.', 'MODIFY_APP_ERROR')
  }
}

export default copyTemplate
