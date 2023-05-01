import path from 'path'
import config from "../config";
import rootRequireUtils from "root-require-utils";

function getMigrationPath(fileName: string) {
  const filePath = path.join(config.dir, fileName)
  return filePath
}


function resolveMigration(fileName: string) {
  return rootRequireUtils.import(getMigrationPath(fileName))
}

export default {
  resolveMigration,
}
