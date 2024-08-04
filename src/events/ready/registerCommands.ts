import type { Client } from 'discord.js'
import getLocalCommands from '../../utils/getLocalCommands'
import getApplicationCommands from '../../utils/getApplicationCommands'


export default async (client: Client): Promise<any> => {
  try {
    const localCommands = await getLocalCommands()

    if (!Array.isArray(localCommands)) {
      throw new Error('Local commands not found')
    }
    const SERVER = process.env.SERVER ?? ""
    const applicationCommands = await getApplicationCommands(client, SERVER)
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand
      const existingCommand = applicationCommands.cache.find(
        (command: any) => command.name === name,
      )

      if (existingCommand) {
        if (Object(localCommands).deleted) {
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
  } catch (err) {
    console.error(err)
  }
}
