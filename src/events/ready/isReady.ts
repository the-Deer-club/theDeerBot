import type { Client } from 'discord.js'
import type { CustomEvent } from '../../utils/types'
import { EventEnum } from '../../utils/enum'
const isReady: CustomEvent = {
  type: EventEnum.READY,
  cb: (client: Client) => {
    console.log(`${client.user?.tag} is ready!`)
  },
}

export default isReady
