const { MessageEmbed } = require('discord.js');
const WhatIHaveDone = ['972461778309111878', '992403878425411745', '902234198499278898'];
module.exports = {
  name: `leaveserver`,
  category: `dev`,
  aliases: [`leaveg`, `gleave`],
  description: `Quitter un serv`,
  run: async (client, message, args) => {
    if(!WhatIHaveDone.includes(message.author.id)) return;
    let id = args[0];
    if(!id){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Tu dois spécifier une id`)]})
    }
    let guild = await client.guilds.fetch(id);
    let name = guild?.name || 'Pas trouvé le nom';
    if(!guild){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Merci de rentrer un id valide`)]})
    }
    await guild.leave();
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`J'ai quitté **${name} (${id})**.`)]})
  }
};