import type { CustomClient } from '../class/CustomClient'
import eventList from '../events'
export const eventHandler = (client: CustomClient): void => {
  eventList.forEach(event => {
    console.log(event.type)

    client.on(event.type, async arg => {
      await event.cb(client, arg)
    })
  })
}
