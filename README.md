
Migramon is a library for migration your databases, etc.

[![npm](https://img.shields.io/npm/v/@migramon/migrate)](https://www.npmjs.com/package/@migramon/migrate)

## Install

``yarn add @migramon/migrate``

or

```npm i -S @migramon/migrate```


## Setup

Add `migramon.yml` config file ro root of your project.
With config like this:
```yml
require:
  - ./polyfill.js

migrator: ./migrations/.config/migramon-setup.ts
dir: ./migrations
```


`migramon-setup.ts` setup file example:
```ts
import Migrator from '@migramon/migrate'
import { PgPlugin, PgStore } from '@migramon/postgres-plugin'

async function setup() {
  // here you can wait for db connection

  const pgPlugin = new PgPlugin({ client })
  // you can use store only variant (without plugin)
  // const store = new PgStore({client})

  const migrator = new Migrator({
    store: pgPlugin.store,
    plugins: [pgPlugin],
  })

  return migrator
}

export default setup
```

File `migramon-setup.ts` is needed for cmd usage at first point. 
If you need programmatic usage, you can just import this file like this:

```ts
import migrationSetup from './migramon-setup.ts'

async function start() {
  const migramon = await migrationSetup()
  await migramon.start()
}

start()
```

## Commands

Migramon has few command-line commands:

```cmd
migramon create new-migration-file
// command will create file like this: 1658763216005-new-migration-file.js


migramon migrate
// command will start migration process
```

You can always use ``migramon --help`` for more instructions.

## Advanced

#### Full `migramon.yml` config example

```yml
require:
  - ./polyfill.js

migrator: ./libs/migramon/setup.ts

dir: ./migrations

file:
  name: "{name}.ts"
  template_file: ./migrations/.config/template.ts
```

## Plugins

- [@migramon/postgres-plugin](https://www.npmjs.com/package/@migramon/postgres-plugin) - provides postgres store
