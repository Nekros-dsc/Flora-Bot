const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "hide",
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`\`Manage Channels\` permission `)
      return message.reply({embeds: [error]});
    }
    const channel = message.mentions.channels.first()  || message.guild.channels.cache.get(args[0])  ||  message.channel;
    if(channel.manageable){
    channel.permissionOverwrites.edit(message.guild.id, {
      VIEW_CHANNEL: false,
      reason: `${message.author.tag} (${message.author.id})`
    })
    const emb = new MessageEmbed()
      .setDescription(`${channel} a été caché`)
      .setColor(client.color)
      return message.channel.send({embeds: [emb]})
    } 
  else {
      const embi = new MessageEmbed()
        .setDescription(`J'ai pas les perms.`)
        .setColor(client.color)
      return message.channel.send({embeds: [embi]})
    }
  }
}