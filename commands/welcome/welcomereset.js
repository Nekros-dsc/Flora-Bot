const { MessageEmbed } = require('discord.js')
const { getSettings } = require("../../models/welcomesystem");

module.exports = {
  name: "welcomereset",
  category: 'welcomer',
  run: async (client, message, args) => {
    const settings = await getSettings(message.guild);
    let response;
    if(!message.member.permissions.has('ADMINISTRATOR')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Administration\` perms to run this command.`)]})
    }
    let status = settings.welcome.enabled;
    if(status !== true){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`The welcomer module for this server is already disabled.`)]});
    }
    await reset(client, settings);
    message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.tick} | Successfully reset the welcomer module.`)]})
  }
}

async function reset(client, settings){
  settings.welcome.enabled = false,
  settings.welcome.channel = null,
  settings.welcome.content = null,
  settings.welcome.autodel = 0,
  settings.welcome.embed = {
    image: null,
    description: null,
    color: null,
    title: null,
    thumbnail: false,
    footer: null,
  }
  settings.save();
}