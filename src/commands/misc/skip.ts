import type { Client, CommandInteraction } from 'discord.js'
import type { CustomCommand } from '../../utils/types'
import type { CustomClient } from '../../class/CustomClient'
import { EmbedBuilder } from 'discord.js'

const skipCommand: CustomCommand = {
  name: 'skip',
  description: 'Skip current song',

  execute: async (client: Client, interaction: CommandInteraction) => {
    try {
      const clientPlayer = client as CustomClient
      const queue = clientPlayer.player.nodes.get(interaction.guildId ?? '')
      if (!queue) {
        await interaction.reply('No song is playing!')
        return
      }

      const currentSong = queue.currentTrack
      if (!currentSong) {
        await interaction.reply('No song is currently playing!')
        return
      }
      console.log('Before', queue)
      queue.node.skip()
      queue.removeTrack(currentSong)
      console.log('After', queue)

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
