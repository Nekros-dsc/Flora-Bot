const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "vcdeafen",
  aliases: ['vcdeaf'],
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('DEAFEN_MEMBERS')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`You must have \`Deafen members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if (!message.guild.me.permissions.has('DEAFEN_MEMBERS')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`I must have \`Deafen members\` permission to use this command.`)
      return message.reply({embeds: [error]});
    }
    if(!message.member.voice.channel){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must be connected to a voice channel first.`)]})
    }
    if(!message.mentions.members.first()){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must mention someone whom you want to deafen in your vc.`)]})
    }
    let member = message.mentions.members.first();
    if(!member.voice.channel){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`<@${member.user.id}> is not in your vc.`)]})
    }
    try{
      member.voice.setDeaf(true, `${message.author.tag} (${message.author.id})`)
      message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Successfully deafened <@${member.user.id}> From Voice!`)]})
    }catch(err){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`I was unable to voice deafen <@${member.user.id}>.`)]})
    }
  }
}