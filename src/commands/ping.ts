// import { SlashCommandBuilder } from '@discordjs/builders'
// import { CommandInteraction } from 'discord.js'

// const data = new SlashCommandBuilder()
//   .setName('ping')
//   .setDescription('Replies with Pong123!')
// async function execute(interaction: CommandInteraction) {
//   await interaction.reply('Pong!')
// }
// export { data, execute }

import { Interaction } from 'discord.js'

export const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!')
  }
}
