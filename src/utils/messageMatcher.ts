import { BAD_WORDS, GREETINGS } from './words'

type Message = {
  type: string
  message: string
}

function isBadWord(message: string): boolean {
  const msgArr = message.split(' ');
  return msgArr.some(msg => BAD_WORDS.includes(msg));
}

function isGreeting(message: string): boolean {
  const msgArr = message.split(' ');
  return msgArr.some(msg => GREETINGS.includes(msg));
}

function checkMessage(message: string): Message {
  if (isBadWord(message)) {
    return { type: 'bad_words', message }
  }
  if (isGreeting(message)) {
    return { type: 'greetings', message }
  }
  return { type: 'normal', message }
}

export { checkMessage }
