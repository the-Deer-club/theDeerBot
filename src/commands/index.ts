import banCommand from './ban.command'
import type { CustomCommand } from '../utils/types'
import kickCommand from './kick.command'
import pingCommand from './ping.command'
import playCommand from './play.command'
import skipCommand from './skip.command'

const commandList: CustomCommand[] = [
  banCommand,
  kickCommand,
  pingCommand,
  playCommand,
  skipCommand,
]

export default commandList
