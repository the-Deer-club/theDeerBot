import { bad_words, greetings } from './words'

type Message {
  type: string
  message: string
}

function isBadWord(message: string): boolean {
  return bad_words.includes(message)
}

function isGreeting(message: string): boolean {
  return greetings.includes(message)
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
