export interface version {
  major: number
  minor: number
  patch: number
  pre: string[]
  build: string[]
  version: string
  original: string
  toString: () => string
  compare: (version: string | version) => 1 | 0 | -1
}

export interface pkg {
  private: boolean
  name: string
  version: string | version
  description: string
  main: string
  module: string
  types: string
  files: string[]
  scripts: { [key: string]: string }
  keywords: string[]
  license: string
  author: string | { name: string, email: string, url: string }
  homepage: string
  repository: { type: string, url: string }
  bugs: { url: string }
  publishConfig: { access: string }
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
  peerDependencies: { [key: string]: string }
  [key: string]: any
}
