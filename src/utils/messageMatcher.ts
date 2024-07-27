import { BAD_WORDS, GREETINGS } from './words'

interface Message {
  type: string
  message: string
}

function isBadWord(message: string): boolean {
  return BAD_WORDS.includes(message)
}

function isGreeting(message: string): boolean {
  return GREETINGS.includes(message)
}

function checkMessage(message: string): Message {
  if (isBadWord(message)) {
    return { type: 'bad_word', message }
  }
  if (isGreeting(message)) {
    return { type: 'greeting', message }
  }
  return { type: 'normal', message }
}

export { checkMessage }
