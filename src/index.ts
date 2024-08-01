import { GatewayIntentBits } from 'discord.js'

import 'dotenv/config'
import { eventHandler } from './handlers/eventHanlder'
import { CustomClient } from './class/CustomClient'
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

eventHandler(client)

client.login(TOKEN).catch(console.error)
