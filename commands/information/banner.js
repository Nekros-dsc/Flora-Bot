const { Message, Client, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "banner",
  category: 'info',
  run: async (client, message, args) => {

   let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;


        const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
          headers: {
            Authorization: `Bot ${client.token}`
          }
        }).then(d => d.data);
        if (data.banner) {
          let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
          url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
          message.channel.send({ embeds:[new MessageEmbed()
            .setColor(`AQUA`)
            .setDescription(`Banner de ${user}`)
            .setFooter(`Requested By: ${message.author.tag}`)
            .setImage(url)]})
        } else {
          message.channel.send({ embeds:[new MessageEmbed()
            .setColor(`AQUA`)
            .setDescription(`Tu n'as pas de banner`)]})
        }

  }
}