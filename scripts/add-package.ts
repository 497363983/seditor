/*
DESCRIPTION:
Add a package automatically

USAGE:
        --name/-n: Name of the package (necessary)
      --target/-t: Target to add (default: 'packages')
--template/--temp: The template, which in the templates directory
                   (you can also add your template in the directory),
                   used to the package (default: 'pkg')
          --force: Force to add the packge. It will cover the exised package
                   with same name (default: false)
         --author: The author of the package (default: same of the package.json in the root)
        --licence: The licence of the package (default: same of the package.json in the root)
           --type: The type of the package (default: 'module')

EXAMPLE:
nr pkg:add -n {{pkgName}} --force
*/

import fs from "node:fs/promises"
import {
  join, 
  resolve
} from "node:path"

import {
  consola 
} from "consola"
import minimist from "minimist"

import {
  getTemplates, rootDir 
} from "./utils"


async function parser() {
  const templates = getTemplates()
  const args = minimist(process.argv.slice(2))
  const pkgName = args.name || args.n || null

  if (!pkgName) {
    consola.error("Please input the name of the package")
    return null
  } else {
    const target = args.target || args.t || "packages"
    // const intro = args.intro || args.i || '';
    const temp = args.template || args.temp || "pkg"
    const template: string = Object.keys(templates).includes(temp) ? temp : "pkg"
    const templatePath = resolve(rootDir, templates[template])
    const pkgPath = resolve(
      rootDir, target, pkgName
    )
    const force = args.force || false
    const repo = JSON.parse(await fs.readFile(resolve(rootDir, "package.json"), { encoding: "utf8" }))
    const author = args.author || args.a || repo.author
    const license = args.licence || args.l || repo.license
    const keywords = repo.keywords
    const type = args.type || "module"
    const repoURL = repo.repository.url

    consola.log(args)
    return {
      pkgName,
      target,
      template,
      templatePath,
      pkgPath,
      force,
      repo,
      author,
      license,
      keywords,
      type,
      repoURL
    }
  }
}




async function fillReadMe(path: string, props: { pkgName: string, license: string }) {
  if (typeof path !== "string") {return}
  let content = await fs.readFile(path, { encoding: "utf8" })
  const {
    pkgName, license 
  } = props

  content = content.replace(/{{pkgname}}/g, pkgName)
  content = content.replace(/{{licence}}/g, license)
  try {
    await fs.writeFile(path, content)
  } catch (e) {
    consola.error(e)
  }
}

async function run() {
  const args = await parser()

  if (args) {
    const {
      pkgName,
      target,
      template,
      templatePath,
      pkgPath,
      force,
      repo,
      author,
      license,
      keywords,
      type,
      repoURL
    } = args

    if (force) {
      try {
        await fs.cp(
          templatePath, pkgPath, {
            recursive: true,
            force 
          }
        )
      } finally {
        const readmePath = resolve(pkgPath, "README.md")

        fillReadMe(readmePath, {
          pkgName,
          license 
        })
      }
    } else {
      try {
        await fs.access(pkgPath)
        consola.warn("Package already exists!")
        return
      } finally {
        await fs.cp(
          templatePath, pkgPath, {
            recursive: true,
            force 
          }
        )
      }
    }

    const readmePath = resolve(pkgPath, "README.md")

    consola.log(readmePath)
    fillReadMe(readmePath, {
      pkgName,
      license 
    })
    const pkgJSON = resolve(pkgPath, "package.json")
    const pkg = JSON.parse(await fs.readFile(pkgJSON, { encoding: "utf8" }))

    pkg.name = `@sweditor/${pkgName}`
    pkg.author = author
    pkg.license = license
    pkg.keywords = keywords
    pkg.type = type
    pkg.repository = {
      type: "git",
      url: repoURL,
      directory: join(target, pkgName)
    }

    await fs.writeFile(
      pkgJSON,
      JSON.stringify(
        pkg, null, 2
      ),
      { encoding: "utf8", }
    )

  } else {
    process.exit(1)
  }


}

run()
