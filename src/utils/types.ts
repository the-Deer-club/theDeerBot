import type { CommandInteraction } from 'discord.js'
import type { EventEnum } from './enum'
import type { CustomClient } from '../class/CustomClient'
export type CustomCommand = {
  name: string
  description: string
  deleted?: boolean
  options?: CommandOptions[]

  execute: (
    client: CustomClient,
    interaction: CommandInteraction,
  ) => Promise<any>
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
