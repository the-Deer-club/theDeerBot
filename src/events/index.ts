import isReady from './ready/isReady'
import texting from './ready/texting'
import registerCommands from './ready/registerCommands'
import handleCommands from './interactionCreate/handleCommands'
import type { CustomEvent } from '../utils/types'

const eventList: CustomEvent[] = [
  isReady,
  registerCommands,
  texting,
  handleCommands,
]

export default eventList
