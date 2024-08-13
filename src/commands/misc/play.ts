import type { CommandInteraction, GuildMember } from 'discord.js'
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
      description: 'Song to play',
      required: true,
    },
  ],
  execute: async (client: CustomClient, interaction: CommandInteraction) => {
    try {
      if (!interaction.isChatInputCommand()) return

      const song = interaction.options.getString('song')
      if (!song) {
        await interaction.reply('Vui lòng nhập tên bài hát!')
        return
      }

      const member = interaction.member as GuildMember
      if (!member.voice.channel) {
        await interaction.reply('Vào phòng đi tui hát cho nghe, :3')
        return
      }

      const clientPlayer = client.player
      await clientPlayer.extractors.register(YoutubeiExtractor, {})

      const queue = interaction.guild
        ? clientPlayer.nodes.create(interaction.guild)
        : null

      if (queue && !queue.connection) await queue.connect(member.voice.channel)

      const searchResult = await clientPlayer.search(song, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })

      if (!searchResult.tracks.length) {
        await interaction.reply('Không tìm thấy bài hát!')
        return
      }

      const track = searchResult.tracks[0]
      queue?.addTrack(track)

      if (queue?.isEmpty()) {
        await queue.play(track)
      }

      const embed = new EmbedBuilder()
        .setDescription(`Added **[${track.title}]** to the queue`)
        .setThumbnail(track.thumbnail)
        .setFooter({ text: `Duration: ${track.duration}` })

      await interaction.reply({ embeds: [embed] })
    } catch (error) {
      console.error('Error in playCommand:', error)
      await interaction.reply('Vấn đề kĩ thuật, mong bạn thông cảm :3')
    }
  },
}

export default playCommand
