
let configDefault: {
  require?: string[]
  migrator?: string
  dir: string
  file: {
    name: string
    template_file?: string
  }
} = {
  dir: '.migrations',
  file: {
    name: '{name}.ts',
  },
}

export default configDefault
