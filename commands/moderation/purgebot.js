const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'purgebots',
  aliases: ['clearbots'],
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Manage Messages\` permissions to use this command.`)]})
    }
    if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "READ_MESSAGE_HISTORY"])) {
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`I must have \`Manage Messages\`, \`Read Message History\` permissions to use this command.`)]})
    }
    const embed = new MessageEmbed()
    .setColor(client.color);
    const amount = args[0] || 99;
    if(amount > 99){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Maximum **99** bot messages can be purged at a time.`)]})
    }
    const response = await client.util.purgeMessages(message.member, message.channel, "BOT", amount);
    if (typeof response === "number") {
      return message.channel.send({embeds: [embed.setDescription(`${client.emoji.tick} | Successfully deleted ${response} bot messages.`)]})
    } else if (response === "BOT_PERM") {
      return message.reply({embeds: [embed.setDescription(`I must have \`Manage Messages\`, \`Read Message History\` permissions to use this command.`)]})
    } else if (response === "MEMBER_PERM") {
      return message.reply({embeds: [embed.setDescription(`You must have \`Manage Messages\` permissions to use this command.`)]})
    } else if (response === "NO_MESSAGES") {
      return message.reply({embeds: [embed.setDescription(`There were no bots messages to purge.`)]})
    } else {
      return message.reply({embeds: [embed.setDescription(`I was unable to delete the messages`)]})
    }
  }
}