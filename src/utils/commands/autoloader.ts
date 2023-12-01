import { fs, path } from "../../deps.ts";
import { ChatInputInteractionCommand } from "../../structures/types/mod.ts";
import { ken } from "../../client/ken.ts";
import { Config } from "../../config/config.ts";

export const loadCommands = async (): Promise<void> => {
  const base = "src/commands/"
  for await (const subdir of fs.walkSync(path.resolve(base))) {
    if (!await fs.exists(path.resolve(base, subdir.name))) continue

    for await (const file of fs.walkSync(path.resolve(base, subdir.name))) {
      if (!file.isFile) continue

      const command = (await import(path.resolve(base, subdir.name, file.name))).default as ChatInputInteractionCommand
      try {
        ken.commands.set(command.name, command)
      } catch (error) {
        console.log(`Error loading command: ${error}`)
      }
    }
  }
  ken.commands.size > 0 ? upsertApplicationCommands() : console.log("No commands")
}

const upsertApplicationCommands = async () => {
  try {
    await ken.helpers.upsertGuildApplicationCommands(
      Config.ALLOWED_GUILD_ID, // too bad..
      ken.commands.array(),
    )
  } catch (error) {
    console.log(`Error while registing commands: ${error}`)
  }
}

