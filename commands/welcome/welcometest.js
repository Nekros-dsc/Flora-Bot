const { MessageEmbed } = require('discord.js')
const { getSettings } = require("../../models/welcomesystem");

module.exports = {
  name: "welcometest",
  category: 'welcomer',
  run: async (client, message, args) => {
    const settings = await getSettings(message.guild);
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    let response = await client.util.sendPreview(settings, message.member);
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(response)]});
  }
}