import type { Client, CommandInteraction, GuildMember } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import type { CustomClient } from '../../class/CustomClient'
import { EmbedBuilder } from 'discord.js'
import { QueryType } from 'discord-player'
import { YoutubeiExtractor } from 'discord-player-youtubei'

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
    try {
      if (!interaction.isChatInputCommand()) return

      const url = interaction.options.getString('song')
      if (!url) {
        return await interaction.reply('Please input your song!')
      }

      const member = interaction.member as GuildMember
      if (!member.voice.channel) {
        return await interaction.reply(
          'You need to join a voice channel first!',
        )
      }
      const clientPlayer = (client as CustomClient).player
      await clientPlayer.extractors.register(YoutubeiExtractor, {})
      let queue
      if (interaction.guild) {
        queue = clientPlayer.nodes.create(interaction.guild)
      }
      if (!queue?.connection) await queue?.connect(member.voice.channel)
      const embed = new EmbedBuilder()
      const searchEngine = QueryType.AUTO
      const result = await clientPlayer.search(url, {
        requestedBy: interaction.user,
        searchEngine,
      })
      if (!result.tracks.length) {
        await interaction.reply('No results found!')
        return
      }

      const song = result.tracks[0]
      queue?.addTrack(song)

      embed
        .setDescription(`Added **[${song.title}]** to the queue`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` })
      await queue?.play(song)
      await interaction.reply({
        embeds: [embed],
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default playCommand
