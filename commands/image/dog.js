const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "dog",
    aliases: ["aj", "sai", "satyam"],
    category: "Images",
    description: "envoie un chien",
    usage: `*dog`,
    run: async (bot, message, args) => {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new Discord.MessageEmbed()
          .setTitle(`🐕 Dog 🐕`)
          .setImage(img)
        
          .setColor("cccfff");
        message.channel.send({embeds: [embed]});
    }
}