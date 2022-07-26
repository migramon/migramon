import fs from 'fs'
import _ from 'lodash'
import YAML from 'yaml'

const configFile = './migramon.yml'
const configFileExists = fs.existsSync(configFile)

let defaultConfig: {
  require?: string[]
  migrator?: string
  dir: string
  file: {
    name: string
    template_file?: string
  }
} = {
  dir: '.migrations',
  file: {
    name: '{name}.ts',
  },
}
// eslint-disable-next-line import/no-mutable-exports
let config = defaultConfig

if (configFileExists) {
  const fileRaw = fs.readFileSync(configFile, 'utf-8')
  const ymlConfig = YAML.parse(fileRaw)
  if (_.isObject(ymlConfig)) {
    config = ymlConfig as any
  }
}

_.defaults(config, defaultConfig)

export default config
