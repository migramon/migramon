import MigraMonPlugin from '../classes/Plugin'
import invariant from 'invariant'
import _ from 'lodash'
import resolveUtils from '../libs/resolveUtils'

async function processAllMigrations(list: string[], plugins: MigraMonPlugin[]): Promise<number> {
  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]
    if (p.onBeforeMigrations) {
      await p.onBeforeMigrations()
    }
  }

  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]
    if (p.prepareMigrations) {
      list = await p.prepareMigrations(list)
    }
  }

  for (let i = 0; i < list.length; i++) {
    await processMigration(list[i], plugins)
  }

  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]
    if (p.onAfterMigrations) {
      await p.onAfterMigrations()
    }
  }

  return list.length
}

async function processMigration(fileName: string, plugins: MigraMonPlugin[]) {
  console.log('=>', fileName)
  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]
    if (p.onBeforeEachMigration) {
      await p.onBeforeEachMigration(fileName)
    }
  }

  const fnMigration = resolveUtils.resolveMigration(fileName)
  invariant(_.isFunction(fnMigration), 'function is not found. Check if you export function properly.')

  await fnMigration()
  // Done

  for (let i = 0; i < plugins.length; i++) {
    const p = plugins[i]
    if (p.onAfterEachMigration) {
      await p.onAfterEachMigration(fileName)
    }
  }
}

export default {
  processAllMigrations,
}
