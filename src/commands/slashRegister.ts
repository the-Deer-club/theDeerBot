import { Client, REST, Routes } from 'discord.js'
import 'dotenv/config'

const BOT_ID = process.env.DISCORD_BOT_ID
const TOKEN = process.env.DISCORD_BOT_TOKEN

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
]

async function slashRegister(client: Client) {
  const rest = new REST({ version: '10' }).setToken(TOKEN as string)

  try {
    const guilds = await client.guilds.fetch()
    for (const guild of guilds.values()) {
      const SERVER_ID = guild.id
      await rest.put(Routes.applicationGuildCommands(BOT_ID as string, SERVER_ID), {
        body: commands,
      })
      console.log(`Registered commands for guild ${SERVER_ID}`)
    }
  } catch (error) {
    console.error('Error registering commands:', error)
  }
}

export default slashRegister
