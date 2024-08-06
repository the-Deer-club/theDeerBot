import path from 'path'
import { getAllFiles } from './getAllFiles'
import type { CustomCommand } from './types'

export default async (excpt?: any): Promise<CustomCommand[]> => {
  const localCommands: any = []
  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true,
  )
  for (const commandCatagory of commandCategories) {
    const commandFiles = getAllFiles(commandCatagory)
    for (const commandFile of commandFiles) {
      const commandModule = await import(commandFile)
      const commandObject = commandModule.default || commandModule
      localCommands.push(commandObject)
    }
  }

  return localCommands
}
