import type { Client, CommandInteraction, Interaction } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import { InteractionType } from 'discord.js'
import getLocalCommands from '../../utils/getLocalCommands'
export default async (
  client: Client,
  interaction: Interaction,
): Promise<any> => {
  const guildId = client.guilds.cache.first()?.id
  console.log(guildId)

  if (!guildId) {
    return
  }
  const localCommands = await getLocalCommands()

  if (interaction.type !== InteractionType.ApplicationCommand) {
    console.log('Interaction is not a command')
    return
  }
  if (!Array.isArray(localCommands)) {
    throw new Error('Local commands not found')
  }
  const cmdArr = Array.from(localCommands)
  const command = cmdArr.find(
    (cmd: CustomCommand) => cmd.name === interaction.commandName,
  )
  if (!command) {
    console.log('Command not found')
    return
  }
  command.execute(client, interaction as CommandInteraction)
}
