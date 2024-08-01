import type { Message, Client } from 'discord.js';
import { checkMessage } from '../../utils/messageMatcher';
import { EMessageType } from '../../utils/enum';

export default async function execute(client: Client): Promise<void> {
  client.on('messageCreate', (message: Message) => {
    (async () => {
      
      
      try {
        console.log('messageCreate', message.content);
        const messageType = checkMessage(message.content.toLowerCase()).type;
        console.log('messageType', messageType);
        
        if (messageType === EMessageType.BAD_WORDS) {
          await message.react('🤬');
          await message.reply('Chửi thề con căk 👿');
        } else if (messageType === EMessageType.GREETINGS) {
          console.log('GREETINGS');
          
          await message.react('😍');
          await message.reply('Nun! Chào bạn :3');
        }
      } catch (err) {
        console.log(err);
      }
    })().catch(err => {
      console.log(err);
      
    });
  });
}
