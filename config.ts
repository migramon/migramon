import fs from 'fs'
import _ from 'lodash'
import YAML from 'yaml'
import configDefault from "./configDefault";

const configFile = './migramon.yml'
const configFileExists = fs.existsSync(configFile)

 // eslint-disable-next-line import/no-mutable-exports
let config = configDefault

if (configFileExists) {
  const fileRaw = fs.readFileSync(configFile, 'utf-8')
  const ymlConfig = YAML.parse(fileRaw)
  if (_.isObject(ymlConfig)) {
    config = ymlConfig as any
  }
}

_.defaults(config, configDefault)

export default config
