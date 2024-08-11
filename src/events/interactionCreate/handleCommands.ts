import type { Client, CommandInteraction, Interaction } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import { InteractionType } from 'discord.js'
import commandList from '../../commands'
export default async (
  client: Client,
  interaction: Interaction,
): Promise<any> => {
  const guildId = client.guilds.cache.first()?.id
  console.log(guildId)

  if (!guildId) {
    return
  }

  if (interaction.type !== InteractionType.ApplicationCommand) {
    console.log('Interaction is not a command')
    return
  }
  if (!Array.isArray(commandList)) {
    throw new Error('Local commands not found')
  }
  const command = commandList.find(
    (command: CustomCommand) => command.name === interaction.commandName,
  )
  if (!command) {
    console.log('Command not found')
    return
  }
  console.log(commandList)
  await command.execute(client, interaction as CommandInteraction)
}
