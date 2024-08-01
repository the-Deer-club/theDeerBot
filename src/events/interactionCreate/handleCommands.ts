import type { Client, CommandInteraction } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import getLocalCommands from '../../utils/getLocalCommands'
export default async (
  client: Client,
  interaction: CommandInteraction,
): Promise<any> => {
  const guildId = client.guilds.cache.first()?.id
  console.log(guildId)

  if (!guildId) {
    return
  }
  const localCommands = await getLocalCommands()
  if (!Array.isArray(localCommands)) {
    throw new Error('Local commands not found')
  }
  const cmdArr = Array.from(localCommands)

  const executedCommand: CustomCommand = cmdArr.find(
    (cmd: CustomCommand) => cmd.name === interaction.commandName,
  )
  if (!executedCommand) {
    console.log('Command not found');
    
  }
  await executedCommand?.execute(client, interaction)

}
