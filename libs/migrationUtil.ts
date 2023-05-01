import fs from 'fs'
import config from '../config'
import _ from "lodash";

async function getListOfMigrations() {
  const isDirExists = fs.existsSync(config.dir)
  if (!isDirExists) {
    console.log('[WARN] migrations are not found')
    return null
  }

  let list = fs.readdirSync(config.dir, { withFileTypes: true})
  list = _.filter(list, item => {
    if (item.isDirectory()) {
      return false
    }

    return true
  })

  const names: string[] = list.map(item => item.name)
  return names
}


export default {
  getListOfMigrations
}
