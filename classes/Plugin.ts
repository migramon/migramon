export abstract class MigraMonPlugin {
  abstract onBeforeMigrations?: () => Promise<any> | any

  abstract onBeforeEachMigration?: (fileName: string) => Promise<any> | any

  abstract onAfterEachMigration?: (fileName: string) => Promise<any> | any

  abstract prepareMigrations?: (list: string[]) => string[] | Promise<string[]>

  abstract onAfterMigrations?: () => Promise<any> | any
}

export default MigraMonPlugin
