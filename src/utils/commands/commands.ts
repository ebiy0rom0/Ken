import { ken } from "../../client/ken.ts";
import { modules } from "../../commands/mod.ts";

export const loadCommands = async (): Promise<void> => {
  try {
    await Promise.all(modules.map(async command =>
      await ken.commands.set(command.name, command)
    ))
  } catch (error) {
    console.log(`Error loading command: ${error}`)
  }
  ken.commands.size > 0 ? upsertApplicationCommands() : console.log("No commands")
}

const upsertApplicationCommands = async () => {
  try {
    await ken.helpers.upsertGuildApplicationCommands(
      ken.guild.id,
      ken.commands.array(),
    )
  } catch (error) {
    console.log(`Error while registing commands: ${error}`)
  }
}
