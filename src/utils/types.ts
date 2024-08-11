import type { Client, CommandInteraction } from 'discord.js'
import type { EventEnum } from './enum'
export type CustomCommand = {
  name: string
  description: string
  deleted?: boolean
  options?: CommandOptions[]

  execute: (client: Client, interaction: CommandInteraction) => Promise<any>
}

type CommandOptions = {
  name: string
  type: number
  description: string
  required: boolean
}

export type CustomEvent = {
  type: EventEnum
  cb: (...args: any[]) => void | Promise<void>
}
