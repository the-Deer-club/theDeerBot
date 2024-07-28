import { Message, Events } from 'discord.js'
import { checkMessage } from '../utils/messageMatcher'

const name = Events.MessageCreate
const once = false
async function execute(message: Message) {
  try {
    if (checkMessage(message.content.toLocaleLowerCase()).type === 'bad_word') {
      message.react('🤬')
      message.reply('Chửi thề con căk 👿')
    }
    if (checkMessage(message.content.toLocaleLowerCase()).type === 'greeting') {
      message.react('😍')
      message.reply('Nun! Chào bạn :3')
    }
  } catch (err) {
    console.log(err)
  }
}

export { name, once, execute }
