const { MessageEmbed } = require('discord.js')
const { getSettings } = require("../../models/welcomesystem");

module.exports = {
  name: "welcome",
  aliases: ['setwelcome', 'wlcset'],
  category: 'welcomer',
  run: async (client, message, args) => {
    const settings = await getSettings(message.guild);
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    let status = args[0]?.toUpperCase();
    if(!status){
      let embed = new MessageEmbed()
      .setColor(client.color)
      .addFields([
        {name: `\`welcome <on | off>\``, value: `Toggles the welcomer system for this server.`},
        {name: `\`welcomechannel\` <#welcome>`,value: `Toggles the channel where welcome message will be send.`},
        {name: `\`welcomemessage\` <autodel | color | description | thumbnail | title>`, value: `Sets the embed values according to your choice`},
        {name: `\`welcometest\``, value: `Test the welcome message how it will look like.`},
      ])
      .setTitle(`Welcome Commands`)
      .setThumbnail(message.guild.iconURL({dynamic: true}))
      return message.reply({embeds: [embed]})
    }
    if(!["ON", "OFF"].includes(status)){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't provide a valid status of welcome.\nStatus: \`on\`, \`off\``)]})
    }
    let response = await client.util.setStatus(settings, status);
    return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(response)]});
  }
}