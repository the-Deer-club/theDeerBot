import { Client, ClientOptions, Collection } from 'discord.js'
import { Player } from 'discord-player'

export class CustomClient extends Client {
  public player?: Player
  public commands?: Collection<any, any>
  constructor(options: ClientOptions) {
    super(options)
    this.player = new Player(this)
    this.commands = new Collection()
  }
}
