import type { CommandInteraction } from 'discord.js'
import type { CustomCommand } from '../utils/types'
import type { CustomClient } from '../class/CustomClient'

const pingCommand: CustomCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  options: [],
  execute: async (client: CustomClient, interaction: CommandInteraction) => {
    await interaction.deferReply()
    const reply = await interaction.editReply('Pong!')
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    await interaction.editReply(`Pong! \`${ping}ms\``).catch(console.error)
  },
}

export default pingCommand
