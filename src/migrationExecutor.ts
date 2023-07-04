import invariant from 'invariant'
import _ from 'lodash'
import rootRequireUtils from 'root-require-utils'
import Migrator from '../Migrator'
import config from '../config'

function initConfig() {
  const { require: requireList = [] } = config

  for (let i = 0; i < requireList.length; i++) {
    rootRequireUtils.import(requireList[i])
  }
}

async function getMigrator(): Promise<Migrator> {
  const { migrator: migratorPath, require: requireList = [] } = config
  invariant(migratorPath, 'If yon want to start migrate from cmd, you must setup migrator config')

  let migrator = rootRequireUtils.import(migratorPath)

  if (_.isFunction(migrator)) migrator = await migrator()
  invariant(migrator instanceof Migrator, 'migrator setup file must return instance of Migrator')

  return migrator
}

async function execute() {
  await initConfig()

  const migrator = await getMigrator()

  await migrator.start()

  // note that we need to close process manually, because database might keep connection open
  // timeout to allow do some post-logging (experimental)
  setTimeout(() => {
    process.exit(0)
  }, 100)
}

export default {
  execute,
}
