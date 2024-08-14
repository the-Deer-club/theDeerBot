import { Client, Collection } from 'discord.js'
import type { ClientOptions } from 'discord.js'
import { Player } from 'discord-player'
import type { downloadOptions } from 'ytdl-core'
class CustomClient extends Client {
  public commands: Collection<string, any>
  public player: Player

  constructor(options: ClientOptions, downloadOptions?: downloadOptions) {
    super(options)
    this.commands = new Collection()
    this.player = new Player(this, {
      ytdlOptions: downloadOptions,
    })
  }
}

export { CustomClient }
