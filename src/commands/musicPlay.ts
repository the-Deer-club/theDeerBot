import {
  ChatInputCommandInteraction,
  Interaction,
  GuildMember,
  Client,
} from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'

export const musicPlay = async (client: Client, interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return

  const chatInputCommand = interaction as ChatInputCommandInteraction
  const url = chatInputCommand.options.getString('song')

  const member = chatInputCommand.member as GuildMember
  if (!member.voice.channel) {
    return interaction.reply('You need to join a voice channel first!')
  }
}
