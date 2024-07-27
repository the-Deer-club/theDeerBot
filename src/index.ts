import { Client, Events, GatewayIntentBits, REST } from 'discord.js'
import { textingEvents } from './events/texting'
import slashRegister from './commands/slashRegister'
import { pingCommand } from './commands/commands'
import 'dotenv/config'

const TOKEN = process.env.DISCORD_BOT_TOKEN

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return
  await textingEvents(message)
})

client.on('interactionCreate', interaction => pingCommand(interaction))

client.once(Events.ClientReady, async clientReady => {
  console.log(`client listening at ${client.user?.displayName}`)
  await slashRegister(client)
})

client.login(TOKEN)
