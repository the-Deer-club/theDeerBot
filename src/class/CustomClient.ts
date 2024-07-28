import { Client, Collection } from 'discord.js'
import { Player } from 'discord-player'

class CustomClient extends Client {
  public commands: Collection<string, any>
  public player: Player

  constructor(options: any) {
    super(options)
    this.commands = new Collection()
    this.player = new Player(this, {
      ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
      },
    })
  }
}

export { CustomClient }
