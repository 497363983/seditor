import fs from "node:fs/promises"
import {
  basename, join,
  parse,   resolve
} from "node:path"

import {
  consola 
} from "consola"
import fg from "fast-glob"

export interface Template {
    [name: string]: any
}

export const rootDir = resolve(__dirname, "..")
export const pkgDir = join(rootDir, "packages")

export function getTemplates(glob: string = "templates/*",
  option: fg.Options = {
    deep: 1,
    cwd: process.cwd(),
    onlyFiles: false
  }): Template {
  const templates = fg.sync(glob, option)

  return Array.from(templates).reduce((pre, cur) => {
    const path = resolve(process.cwd(), cur)
    //@ts-ignore
    const name = isDirectory(path) ? basename(cur) : getFileName(cur)

    return Object.assign(pre, { [name]: path })
  }, {})
}

export function getFileName(path: string) {
  return parse(path).name
}

export async function isDirectory(path: string) {
  return (await fs.stat(path)).isDirectory()
}

export async function isExists(path: string) {
  return await fs.access(path)
}

export async function updatePkgReadMe(name: string, dir: string = pkgDir) {
  const pkgPath = join(dir, name)
  const readmePath = join(pkgPath, "README.md")
  let readme = await fs.readFile(readmePath, { encoding: "utf8" })

  readme = readme.replace(/{{pkgname}}/g, name)
  try {
    await fs.writeFile(readmePath, readme)
  } catch (e) {
    consola.log(e)
  }
}
