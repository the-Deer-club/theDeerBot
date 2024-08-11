import type { Message, Client } from 'discord.js'
import type { CustomEvent } from '../../utils/types'
import { checkMessage } from '../../utils/messageMatcher'
import { EMessageType, EventEnum } from '../../utils/enum'

const textingEvent: CustomEvent = {
  type: EventEnum.READY,
  cb: async (client: Client) => {
    client.on('messageCreate', async (message: Message) => {
      try {
        console.log('messageCreate', message.content)
        const messageType = checkMessage(message.content.toLowerCase()).type
        console.log('messageType', messageType)

        if (messageType === EMessageType.BAD_WORDS) {
          await message.react('🤬')
          await message.reply('Chửi thề con căk 👿')
        } else if (messageType === EMessageType.GREETINGS) {
          console.log('GREETINGS')

          await message.react('😍')
          await message.reply('Nun! Chào bạn :3')
        }
      } catch (error) {
        console.log(error)
      }
    })
  },
}

export default textingEvent
