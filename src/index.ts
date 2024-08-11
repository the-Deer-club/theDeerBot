import { GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
import { eventHandler } from './handlers/eventHanlder'
import { CustomClient } from './class/CustomClient'
import { Player } from 'discord-player'
const TOKEN = process.env.DISCORD_BOT_TOKEN

const client = new CustomClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

client.player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25,
  },
})

eventHandler(client)

client.login(TOKEN).catch(console.error)
