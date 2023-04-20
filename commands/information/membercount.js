const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  aliases: ['mc','Mc'],
  category: 'info',
  run: async (client, message, args) => {


    const embed = new MessageEmbed()
    .setColor(`BLACK`)
    .setTitle(`Members`)
    .setDescription(`**Total Membres:** ${message.guild.memberCount}\n**En ligne:** ${message.guild.members.cache.filter(x => x.presence && x.presence.status === "online").size}\n**Idle:** ${message.guild.members.cache.filter(x => x.presence && x.presence.status === "idle").size}\n**Dnd:** ${message.guild.members.cache.filter(x => x.presence && x.presence.status === "dnd").size}\n**Offline:** ${message.guild.members.cache.filter(x => x.presence && x.presence.status === "offline").size}`)
    .setTimestamp()

    message.channel.send({ embeds: [embed] })
  }
}