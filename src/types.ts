export interface Answers {
  projectName: string
  language: 'JavaScript' | 'TypeScript'
  template: 'blank' | 'expressApi' | 'expressApi + Frontend'
  installDependencies: boolean
  viteName: string
}
export interface InquirerAnswers {
  (): Promise<Answers>
}

export type CustomErrorTypes =
  | 'INQUIRER_ERROR'
  | 'INVALID_NAME_ERROR'
  | 'INVALID_DIRECTORY_NAME_ERROR'
  | 'CLI_ERROR'
  | 'COPY_TEMPLATE_ERROR'
  | 'TEST_ERROR_CODE'
  | 'INSTALL_DEPENDENCIES_ERROR'
  | 'UPDATE_PACKAGE_JSON_ERROR'
  | 'MODIFY_APP_ERROR'
