import type { CommandInteraction, Client } from 'discord.js'
import type { CustomCommand } from '../../utils/types'

const banCommand: CustomCommand = {
  name: 'ban',
  description: 'Bans a user',
  options: [
    {
      name: 'user',
      type: 6,
      description: 'User to ban',
      required: true,
    },
    {
      name: 'reason',
      type: 3,
      description: 'Reason for ban',
      required: false,
    },
  ],
  execute: async (client: Client, interaction: CommandInteraction) => {
    await interaction.deferReply()
    const reply = await interaction.editReply('Pong!')
    const ping = reply.createdTimestamp - interaction.createdTimestamp
    await interaction.editReply(`Pong! \`${ping}ms\``).catch(err => {
      console.log(err)
    })
  },
}

export default banCommand;
