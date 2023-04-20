const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ['av' , 'photo'],
  category: 'info',
  run: async (client, message, args) => {

   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

    const embed = new MessageEmbed()
    .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setDescription(`[\`PNG\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "png" })}) | [\`JPG\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" })}) | [\`WEBP\`](${member.displayAvatarURL({ dynamic: true, size: 2048, format: "webp" })})`) 
    .setColor(`#2f3136`)

    message.reply({ embeds: [embed] })
  }
}