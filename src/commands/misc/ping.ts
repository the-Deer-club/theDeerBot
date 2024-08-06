import type { CommandInteraction, Client } from 'discord.js'
import type { CustomCommand } from '../../utils/types'

const pingCommand: CustomCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  options: [],
  execute: async (client: Client, interaction: CommandInteraction) => {
    await interaction.deferReply()
    const reply = await interaction.editReply('Pong!')
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    await interaction.editReply(`Pong! \`${ping}ms\``).catch(err => {
      console.log(err)
    })
  },
}

export default pingCommand
