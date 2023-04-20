const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "addemoji",
  aliases: ['addemote' , 'steal'],
  category: 'info',
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_EMOJIS")){
      return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Tu dois avoir \`Manage Emoji\` perms`)]}); 
    }    
    if (!message.guild.me.permissions.has("MANAGE_EMOJIS")){
      return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`\`Manage Emoji\` j'ai pas.`)]}); 
    }
    let emoji = args[0];
    if(!emoji){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Merci de dire qqc.`)]})
    }
    let emojiId = null;
    try{
      emojiId = emoji.match(/([0-9]+)/)[0];
    }catch(err){
    }
    if(!emojiId){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Rentre un emoji valide.`)]})
    }
    let name = args[1] || 'Pluto_emoji';
    let link = `https://cdn.discordapp.com/emojis/${emojiId}`;
    try{
      await message.guild.emojis.create(link, name).then((newEmoji) => {
        message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Emoji ajouté avec succès ${newEmoji.toString()}.`)]})
      })
    }catch(err){
      message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`jpp add emoji.\nPossible Raisons: \`Mass emojis added\`, \`Plus de places\`.`)]});
    }
  }
}