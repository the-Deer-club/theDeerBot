import type { Client } from 'discord.js'
export default (client: Client): void => {
  console.log(`${client.user?.tag} is ready!`)
}
