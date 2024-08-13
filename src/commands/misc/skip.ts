import type { CommandInteraction } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import type { CustomClient } from '../../class/CustomClient'
import { EmbedBuilder } from 'discord.js'

const skipCommand: CustomCommand = {
  name: 'skip',
  description: 'Skip current song',

  execute: async (client: CustomClient, interaction: CommandInteraction) => {
    try {
      const clientPlayer = client.player
      const queue = clientPlayer.nodes.get(interaction.guildId ?? '')
      if (!queue) {
        await interaction.reply('No song is playing!')
        return
      }

      const currentSong = queue.currentTrack
      if (!currentSong) {
        await interaction.reply('No song is currently playing!')
        return
      }
      queue.node.skip()
      queue.removeTrack(currentSong)

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Skipped **${currentSong.title}`)
            .setThumbnail(currentSong.thumbnail),
        ],
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default skipCommand
