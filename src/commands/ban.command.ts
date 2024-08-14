import type { CommandInteraction, GuildMember } from 'discord.js'
import type { CustomCommand } from '../utils/types'
import type { CustomClient } from '../class/CustomClient'
const banCommand: CustomCommand = {
  name: 'ban',
  description: 'bans a user',
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
  execute: async (client: CustomClient, interaction: CommandInteraction) => {
    try {
      const targetUserID = interaction.options.get('user')?.value as string
      const reason =
        (interaction.options.get('reason')?.value as string) ??
        'Bạn bị ban không vì gì cả! :3'

      const targetUser = await interaction.guild?.members.fetch(targetUserID)
      if (!targetUser) {
        await interaction.reply('Nun, người cần ban không tồn tại')
        return
      }

      if (targetUser?.id === interaction.guild?.ownerId) {
        await interaction.reply('Bạn không thể ban Sáng Trần được :3')
        return
      }
      const requestMember = interaction?.member as GuildMember
      const requestRole = requestMember.roles.highest.position
      const botRole = interaction.guild?.members.me?.roles.highest.position
      const targetRole = targetUser.roles.highest.position

      if (targetRole >= requestRole) {
        await interaction.reply('Đủ trình không ???')
        return
      }
      if (botRole && targetRole >= botRole) {
        await interaction.reply('Xin lỗi anh chịu không nổi...')
        return
      }

      await targetUser.send(reason)
      await targetUser.ban({ reason })
      await interaction.reply(
        `Nun, ${targetUser.displayName} đã bị bay màu khỏi clb :3`,
      )
    } catch (err) {
      console.log(err)
    }
  },
}

export default banCommand
