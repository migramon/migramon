export abstract class MigraMonStore {
  abstract init: () => any

  abstract getMigration: (key: string) => Promise<any>

  abstract createMigration: (params: { key: string; state: any }) => Promise<any>

  abstract setMigration: (params: { key: string; state: any }) => Promise<any>
}

export default MigraMonStore
