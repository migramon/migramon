import MigraMonPlugin from '../classes/Plugin'
import MigraMonStore from '../classes/Store'
import invariant from 'invariant'
import _ from 'lodash'
import path from 'path'

interface MigrationState {
  migration: string
  date: number
}

class ConfigPlugin implements MigraMonPlugin {
  state: MigrationState[] = []

  store: MigraMonStore

  key: string

  private isStateExists = false

  private isStateChanged = false

  constructor(params: {
    store: MigraMonStore
    key: string
  }) {
    this.store = params.store
    this.key = params.key

    invariant(this.key, 'key param is required for ConfigPlugin')
  }
  // store: MigraMonStore

  // constructor(params) {
  //   super(params)
  // }

  prepareMigrations(list: string[]) {
    list = _.filter(list, migration => {
      const fileInfo = path.parse(migration)

      return !_.find(this.state, item => {
        return item.migration === fileInfo.name
      })
    })
    return list
  }

  async onBeforeMigrations() {
    const data = await this.store.getMigration(this.key)
    this.isStateExists = !!data
    if (data) {
      this.state = data
    }
  }

  onAfterEachMigration(fileName: string) {
    const fileInfo = path.parse(fileName)

    this.state.push({ migration: fileInfo.name, date: Date.now() })
    this.isStateChanged = true
  }

  async onAfterMigrations() {
    if (!this.isStateChanged) return null

    if (this.isStateExists) {
      await this.store.setMigration({ key: this.key, state: this.state })
    } else {
      await this.store.createMigration({ key: this.key, state: this.state })
    }
  }
}

export default ConfigPlugin
