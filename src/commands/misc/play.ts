import type { Client, CommandInteraction, GuildMember } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import type { CustomClient } from '../../class/CustomClient'
import { MessageEmb } from 'discord.js'
const playCommand: CustomCommand = {
  name: 'play',
  description: 'Play a song!',
  options: [
    {
      name: 'song',
      type: 3,
      description: 'song to play',
      required: true,
    },
  ],
  execute: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return

    const url = interaction.options.getString('song')
    console.log(url)

    const member = interaction.member as GuildMember
    if (!member.voice.channel) {
      return await interaction.reply('You need to join a voice channel first!')
    }
    const clientPlayer = (client as CustomClient).player;
    let queue
    if (interaction.guild) {
        queue = clientPlayer.nodes.create(interaction.guild)
    }
    if (!queue?.connection) await queue?.connect(member.voice.channel)
    let embed = new MessageEmbed()
    
  },
}

export default playCommand
