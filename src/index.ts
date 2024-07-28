import { Events, GatewayIntentBits } from 'discord.js'
import { textingEvents } from './events/texting'
import slashRegister from './commands/slashRegister'
import { pingCommand } from './commands/ping'
import { musicPlay } from './commands/musicPlay'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import { CustomClient } from './class/CustomClient'

const TOKEN = process.env.DISCORD_BOT_TOKEN

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const commandsPath = path.join(__dirname, 'commands')
// const eventsPath = path.join(__dirname, 'events')

const client = new CustomClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
})
// const commandsFile = fs
//   .readdirSync(commandsPath)
//   .filter(file => file.endsWith('.ts'))
// const eventsFile = fs
//   .readdirSync(eventsPath)
//   .filter(file => file.endsWith('.ts'))

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return
  await textingEvents(message)
})

client.on('interactionCreate', interaction => {
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case 'ping':
        pingCommand(interaction)
        break
      case 'play':
        musicPlay(client, interaction)
        break
      default:
        break
    }
  }
})

client.once(Events.ClientReady, async clientReady => {
  console.log(`client listening at ${client.user?.displayName}`)
  await slashRegister(client)
})

client.login(TOKEN)
