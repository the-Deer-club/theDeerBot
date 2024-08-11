import type { Client, CommandInteraction, Interaction } from 'discord.js'
import { InteractionType } from 'discord.js'
import commandList from '../../commands'
import type { CustomEvent, CustomCommand } from '../../utils/types'
import { EventEnum } from '../../utils/enum'

const handleCommands: CustomEvent = {
  type: EventEnum.INTERACTION,
  cb: async (client: Client, interaction: Interaction) => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  },
}

export default handleCommands
