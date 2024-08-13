import playCommand from './misc/play'
import pingCommand from './misc/ping'
import skipCommand from './misc/skip'
import kickCommand from './misc/kick'
import type { CustomCommand } from '../utils/types'
import banCommand from './misc/ban'

const commandList: CustomCommand[] = [
  playCommand,
  pingCommand,
  skipCommand,
  kickCommand,
  banCommand,
]

export default commandList
