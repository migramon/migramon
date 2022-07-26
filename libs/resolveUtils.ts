import path from 'path'
import fileUtil from '../src/fileUtil'

function resolvePathFromRoot(filePath: string): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore not sure issue can happen. Waiting for crash first.
  let rootPath = process.env.PWD as string // require.main?.path
  return path.resolve(rootPath, filePath)
}

function resolveMigration(fileName: string) {
  const filePath = `./${fileUtil.getMigrationFilePath(fileName)}`

  const pathAbsolute = resolvePathFromRoot(filePath)

  return importFile(pathAbsolute)
}

function importFile(filePath:string) {
  // eslint-disable-next-line
  const fnMigration = require(filePath)

  return fnMigration?.default || fnMigration
}

function requireFromRoot(filePath: string) {
  filePath = resolvePathFromRoot(filePath)
  return importFile(filePath)
}

export default {
  resolvePathFromRoot,
  resolveMigration,
  importFile,
  requireFromRoot,
}
