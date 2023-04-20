const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "hideall",
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')){
      let error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`Y\`Manage Channels\` permission `)
      return message.reply({embeds: [error]});
    }
    if(client.util.hasHigher(message.member) == false){
      let error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`Tu dois être plus haut que moi`)
      return message.reply({embeds: [error]});
    }
    let hided = 0;
    const channel = message.mentions.channels.first()  || message.guild.channels.cache.get(args[0])  ||  message.channel;
    message.guild.channels.cache.filter(c => c.name).forEach(channel => {
      if(channel.manageable){
        channel.permissionOverwrites.edit(message.guild.id, {
          VIEW_CHANNEL: false,
          reason: `${message.author.tag} (${message.author.id})`
        })
        hided++;
      }
    })
    message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(` ${hided} salons cachés.`)]})
  }
}