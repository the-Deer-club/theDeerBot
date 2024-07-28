import { Interaction } from 'discord.js'

export const pingCommand = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!')
  }
}
