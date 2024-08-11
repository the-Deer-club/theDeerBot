import type { Client } from 'discord.js'
// import getLocalCommands from '../../utils/getLocalCommands'
import getApplicationCommands from '../../utils/getApplicationCommands'
import commandList from '../../commands'
export default async (client: Client): Promise<any> => {
  try {
    if (!Array.isArray(commandList)) {
      throw new Error('Local commands not found')
    }
    const guildIds = client.guilds.cache.map(guild => guild.id)
    for (const id of guildIds) {
      const applicationCommands = await getApplicationCommands(client, id)
      for (const localCommand of commandList) {
        const { name, description, options } = localCommand
        const existingCommand = applicationCommands.cache.find(
          (command: any) => command.name === name,
        )

        if (existingCommand) {
          if (Object(commandList).deleted) {
            await applicationCommands.delete(existingCommand.id)
            continue
          }
        }
        await applicationCommands.create({
          name,
          description,
          options,
        })
      }
    }
  } catch (err) {
    console.error(err)
  }
}
