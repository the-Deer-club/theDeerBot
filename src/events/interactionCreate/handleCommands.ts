import type { CommandInteraction } from 'discord.js'
import { InteractionType } from 'discord.js'
import commandList from '../../commands'
import type { CustomEvent, CustomCommand } from '../../utils/types'
import { EventEnum } from '../../utils/enum'
import type { CustomClient } from '../../class/CustomClient'

const handleCommands: CustomEvent = {
  type: EventEnum.INTERACTION,
  cb: async (client: CustomClient, interaction: CommandInteraction) => {
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
        await interaction.reply(`Nun, tui chưa gặp trường hợp này bao giờ`)
        return
      }
      console.log(commandList)
      await command.execute(client, interaction)
    } catch (error) {
      console.log(error)
    }
  },
}

export default handleCommands
