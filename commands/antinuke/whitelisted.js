const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "wlisted",
  aliases: ['l', 'trusted', 'whitelisted'],
  category: 'security',
  run: async (client, message, args) => {
    if (message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`:x: | Seul l'owner peut utiliser cette commande.`)]});
    } else {
      const antinuke = await client.db.get(`${message.guild.id}_antinuke`);
      if (!antinuke) {
        message.reply({ embeds: [new MessageEmbed().setColor("2f3136").setDescription(`:x: | L'antinuke n'est pas activé.`)]});
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            message.reply({ embeds: [new MessageEmbed().setColor("2f3136").setDescription(`:x: | reutilise la cmd.`)]})
          } else {
            const users = data.whitelisted;
            const mentions = [];
            
            if (users.length !== 0) {
              users.forEach(userId => mentions.push(`<@${userId}> (${userId})`));
              const whitelisted = new MessageEmbed()
                .setColor("2f3136")
                .setTitle(`__**Personne WL**__`)
                .setDescription(mentions.join('\n'));
              message.channel.send({ embeds: [whitelisted] });
            } else {
              message.reply({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`:x: | Personne est wl.`)]})
            }
          }
        });
      }
    }
  },
};