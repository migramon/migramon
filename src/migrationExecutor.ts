import invariant from 'invariant'
import _ from 'lodash'
import Migrator from '../Migrator'
import config from '../config'
import resolveUtils from '../libs/resolveUtils'

function initConfig() {
  const { require: requireList = [] } = config

  for (let i = 0; i < requireList.length; i++) {
    resolveUtils.requireFromRoot(requireList[i])
  }
}

async function getMigrator(): Promise<Migrator> {
  const { migrator: migratorPath, require: requireList = [] } = config
  invariant(migratorPath, 'If yon want to start migrate from cmd, you must setup migrator config')

  for (let i = 0; i < requireList.length; i++) {
    const filePath = resolveUtils.resolvePathFromRoot(requireList[i])
    require(filePath)
  }

  // const filePath = resolveUtils.resolvePathFromRoot(migratorPath)
  // const a = require(filePath)
  let migrator = resolveUtils.requireFromRoot(migratorPath)

  if (_.isFunction(migrator)) migrator = await migrator()
  invariant(migrator instanceof Migrator, 'migrator setup file must return instance of Migrator')

  return migrator
}

async function execute() {
  await initConfig()

  const migrator = await getMigrator()

  await migrator.start()
  process.exit(0)
}

export default {
  execute,
}
