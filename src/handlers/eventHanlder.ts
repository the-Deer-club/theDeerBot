import path from 'path'
import { getAllFiles } from '../utils/getAllFiles'
import type { Client, Message } from 'discord.js'

export const eventHandler = (client: Client, msg?: Message): void => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)
  
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder)
    eventFiles.sort((a, b) => a.localeCompare(b))

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()
    
    if (!eventName) {
      console.warn(`Skipping folder without a valid event name: ${eventFolder}`)
      continue
    }
    
    
    client.on('ready', args => {
      ;(async () => {
        for (const eventFile of eventFiles) {
          console.log(`Loading event: ${eventFile}`);
          
          const eventModule = await import(eventFile)
          const eventFunction = eventModule.default || eventModule
          await eventFunction(client, args)
        }
        
      })().catch(err => {
        console.log(err)
      })
    })
  }
}
