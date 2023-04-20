const { MessageEmbed } = require('discord.js')
const { getSettings } = require("../../models/welcomesystem");

module.exports = {
  name: "welcomechannel",
  category: 'welcomer',
  run: async (client, message, args) => {
    const settings = await getSettings(message.guild);
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    if(!message.mentions.channels.first()){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't mentioned the channel to set as welcome channel.`)]});
    }
    let response = await client.util.setChannel(settings, message.mentions.channels.first());
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(response)]});
  }
}