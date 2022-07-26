import fs from 'fs'
import path from 'path'
import config from '../libs/libConfig'
import defaultTemplate from './default-template'

function getFileName(fileName: string) {
  fileName = fileName.replace(/\..+/, '') // remove extension if someone put it
  fileName = fileName.replace(/[^\w\-]/, '-') // remove not allowed symbols

  let newName = `${Date.now()}-${config.file.name}`
  newName = newName.replace(/\{name\}/, fileName)

  return newName
}

function getMigrationFilePath(fileName: string) {
  const filePath = path.join(config.dir, fileName)

  return filePath
}

function getTemplate(): string {
  const customFilePath = config.file.template_file
  if (customFilePath) {
    const template = fs.readFileSync(customFilePath, 'utf-8')
    if (template) return template
  }

  return defaultTemplate
}

function createFile({ fileName }: { fileName: string }) {
  fileName = getFileName(fileName)

  const isDirExists = fs.existsSync(config.dir)
  if (!isDirExists) {
    console.log('dir for migrations is not exists. Creating...')
    fs.mkdirSync(config.dir)
  }

  const filePath = path.join(config.dir, fileName)
  const isFileExists = fs.existsSync(filePath)
  if (isFileExists) {
    // actually each file will be with a new timestamp, so error will not happen probably.
    throw new Error('Such migration file exists already!')
  }

  const templateBody = getTemplate()
  fs.writeFileSync(filePath, templateBody)
  console.log('file is created: ', `\n${filePath}`)
}

export default {
  getMigrationFilePath,
  createFile,
}
