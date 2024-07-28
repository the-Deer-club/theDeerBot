import { Events, GatewayIntentBits } from 'discord.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import { CustomClient } from './class/CustomClient'
// import slashRegister from './commands/slashRegister'
import dynamicImport from './utils/dynamicImport'
import slashRegister from './commands/slashRegister'
const TOKEN = process.env.DISCORD_BOT_TOKEN as string

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const commandsPath = path.join(__dirname, 'commands')
const eventsPath = path.join(__dirname, 'events')

const client = new CustomClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

// Dynamically import commands
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.ts'))
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  dynamicImport(filePath)
    .then(command => {
      if (command.execute) {
        client.on('interactionCreate', async interaction => {
          command.execute(interaction)
        })
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        )
      }
    })
    .catch(err => console.error(`Failed to load command ${filePath}: ${err}`))
}

// Dynamically import events
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.ts'))
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  dynamicImport(filePath)
    .then(event => {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
      } else {
        client.on(event.name, (...args) => event.execute(...args, client))
      }
    })
    .catch(err => console.error(`Failed to load event ${filePath}: ${err}`))
}

client.once(Events.ClientReady, async () => {
  console.log(`client listening at ${client.user?.tag}`)
  await slashRegister(client)
})

client.login(TOKEN).catch(console.error)
