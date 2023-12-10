import { fs, path } from "../../deps.ts";
import { ChatInputInteractionCommand } from "../../structures/types/mod.ts";
import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";

const collect = async <T>(iter: AsyncIterable<T>): Promise<T[]> => {
  const results: T[] = []

  for await (const result of iter) {
      results.push(result)
  }

  return results
}

const resourceDir = path.resolve(`src/commands/`)
export const commands = await collect(fs.walk(resourceDir, { includeDirs: false }))

export const loadCommands = async (): Promise<void> => {
  try {
    await Promise.all(commands.map(file => file.path).filter(file => path.extname(file) === ".ts").map(async path => {
      const command = (await import(path))
      console.log(command)
      const cmd = command.default as ChatInputInteractionCommand
      ken.commands.set(command.name, command)
    }))
  } catch (error) {
    console.log(`Error loading command: ${error}`)
  }

  ken.commands.size > 0 ? upsertApplicationCommands() : console.log("No commands")
}

const upsertApplicationCommands = async () => {
  try {
    await ken.helpers.upsertGuildApplicationCommands(
      Config.ALLOWED_GUILD_ID,
      ken.commands.array(),
    )
  } catch (error) {
    console.log(`Error while registing commands: ${error}`)
  }
}

export const createCommand = (command: ChatInputInteractionCommand) => command
