import type { Client, CommandInteraction } from 'discord.js'

export type CustomCommand = {
  name: string
  description: string
  deleted?: boolean
  options?: CommandOptions[]

  execute?: (client: Client, interaction: CommandInteraction) => Promise<any>
}

type CommandOptions = {
  name: string
  type: number
  description: string
  required: boolean
}
