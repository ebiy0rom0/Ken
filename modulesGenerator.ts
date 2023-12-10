import { fs, path } from "./src/deps.ts";

const excludeFiles = ["mod.ts", "error.ts"]

const collect = async <T>(iter: AsyncIterable<T>): Promise<T[]> => {
  const results: T[] = []

  for await (const result of iter) {
    results.push(result)
  }
  return results
}

const resourcesDir = path.resolve(".", "src", "commands")
const allResources = await collect(fs.walk(resourcesDir, { includeDirs: false }))

const routeModules = await Promise.all(allResources
  .map(file => file.path)
  .filter(file => path.extname(file) === ".ts" && !excludeFiles.includes(path.basename(file)))
  .map(file => `./${path.relative(resourcesDir, file)}`
))

const moduleIdentifier = (module: string) => `__${path.basename(module, ".ts")}`

const modules = `
// This
import { ChatInputInteractionCommand } from "../structures/types/mod.ts";

${routeModules.map(module =>
  `import ${moduleIdentifier(module)} from '${module}';`).join('\n')
}

export const modules: ChatInputInteractionCommand[] = [
${routeModules.map(module =>
  `  ${moduleIdentifier(module)}`).join(',\n')
}
]`

Deno.writeTextFileSync(path.resolve(resourcesDir, 'mod.ts'), modules)

Deno.exit(1)