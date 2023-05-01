import fs from 'fs'
import MigraMonPlugin from './classes/Plugin'
import MigraMonStore from './classes/Store'
import colors from 'colors'
import ConfigPlugin from './plugins/ConfigPlugin'
import config from './config'
import migrationController from './src/migrationController'
import migrationUtil from './libs/migrationUtil'
import _ from "lodash";

class Migrator {
  store: MigraMonStore

  plugins: MigraMonPlugin[]

  key: string

  constructor(params: {
    store: MigraMonStore
    plugins?: MigraMonPlugin[]
    key?: string
  }) {
    this.store = params.store
    this.plugins = params.plugins || []
    this.key = params.key || 'main'
  }

  async start() {
    const { store } = this
    await store.init()

    const isDirExists = fs.existsSync(config.dir)
    if (!isDirExists) {
      console.log('[WARN] migrations are not found')
      return null
    }

    const list = await migrationUtil.getListOfMigrations()
    if(!list || _.isEmpty(list)) return null

    const plugins = [new ConfigPlugin({ store, key: this.key }), ...this.plugins]

    const numOfMigrations = await migrationController.processAllMigrations(list, plugins)

    if(!numOfMigrations) return null
    console.log(colors.green('====>    Migration completed successfully   <===='))
  }
}

export default Migrator
