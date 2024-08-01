import type {
    Client,
   
  } from 'discord.js';
  
  export default async (client: Client, guildID: string): Promise<any> => {
    let applicationCommands
    
    if (guildID) {
      const guild = await client.guilds.fetch(guildID);
      applicationCommands = guild.commands;
    } else {
      applicationCommands = client.application?.commands;
    }
  
    if (applicationCommands) {
      await applicationCommands.fetch({ force: true });
    }
    
    return applicationCommands;
  };
  