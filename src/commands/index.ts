import playCommand from './misc/play'
import pingCommand from './misc/ping'
import skipCommand from './misc/skip'
import type { CustomCommand } from '../utils/types'

const commandList: CustomCommand[] = [playCommand, pingCommand, skipCommand]

export default commandList
