import { Client, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

const TOKEN = process.env.DISCORD_BOT_TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, clientReady => {
  console.log(`client listening at ${client.user?.displayName}`)
})

client.login(TOKEN)
