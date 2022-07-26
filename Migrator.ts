import fs from 'fs'
import MigraMonPlugin from './classes/Plugin'
import MigraMonStore from './classes/Store'
import colors from 'colors'
import ConfigPlugin from './plugins/ConfigPlugin'
import config from './libs/libConfig'
import migrationController from './migrationController'

class Migrator {
  store: MigraMonStore

  plugins: MigraMonPlugin[]

  constructor(params: {
    store: MigraMonStore
    plugins?: MigraMonPlugin[]
  }) {
    this.store = params.store
    this.plugins = params.plugins || []
  }

  async start() {
    const { store } = this
    await store.init()

    // const state = await store.getMigration('main')

    const isDirExists = fs.existsSync(config.dir)
    if (!isDirExists) {
      console.log('[WARN] migrations are not found')
      return null
    }

    const list = fs.readdirSync(config.dir)
    console.log('config', config)

    const plugins = [new ConfigPlugin({ store, key: 'main' }), ...this.plugins]

    await migrationController.processAllMigrations(list, plugins)
    console.log(colors.green('====>    Migration completed successfully   <===='))
  }
}

export default Migrator
