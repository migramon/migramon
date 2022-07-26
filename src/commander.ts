import Yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fileUtil from './fileUtil'
import migrationExecutor from './migrationExecutor'

function getArgs() {
  return Yargs(hideBin(process.argv))
    .command<{ fileName: string }>('create [fileName]', 'create migration file', yargs => yargs.positional('fileName', {
      describe: 'File name for a new migration',
      type: 'string',
    }), argv => {
      const { fileName } = argv
      if (!fileName) {
        console.error('fileName is required for create command.')
        console.error('Consider use command: create my-new-file')
        process.exit(1)
      }
      fileUtil.createFile({ fileName })
    })
    .command<{ }>('migrate', 'run your migration files', yargs => {}, async argv => {
      await migrationExecutor.execute()
    })
    .demandCommand(1)

    .strict()
    // .wrap(100)
    .fail((msg, err) => {
      if (err) {
        throw err
      }
      console.error(msg)
      process.exit(1)
    })
    .exitProcess(false)
}

const start = async () => {
  const yargs = getArgs()
  const { argv } = yargs

  // console.log('start args', argv)
}

start()
