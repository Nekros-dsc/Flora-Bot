const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'whitelist',
  aliases: ['wl'],
  category: 'security',
  run: async (client, message, args) => {
    const wl = new MessageEmbed()
      .setColor("2f3136")
      .setTitle(`__**Whitelist Commands**__`)
      .setDescription(`**Ajoute qqn au wl**`)
      .addFields([
        { name: `__**Usage**__`, value: `\`${message.guild.prefix}whitelist @user\`\n\`${message.guild.prefix}wl @user\`` }
      ])
    if (message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [new MessageEmbed().setColor("2f3136").setDescription(`:x: | Seul l'owner peut utiliser cette commande.`)]});
    } 
    const antinuke = await client.db.get(`${message.guild.id}_antinuke`);
    if (!antinuke) {
      const dissable = new MessageEmbed()
        .setColor("2f3136")
        .setDescription(`**${message.guild.name}**\n \`\`\`Ohh NO! Tu n'as pas activé l'antinule\`\`\`
Statut actuelle : :x:

Pour activer : antinuke enable ** `)
      message.channel.send({ embeds: [dissable]})
    } else {
      await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
        if (!data) {
          await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
          return message.reply({embeds: [new MessageEmbed().setColor("2f3136").setDescription(`:x: | Refais la cmd stp.`)]})
        } 
        const user = message.mentions.users.first();
        if (!user) {
          return message.reply({ embeds: [wl] });
        } else {
          const userId = user.id;
          if (data.whitelisted.includes(userId)) {
             message.reply({ embeds: [new MessageEmbed().setColor("2f3136").setDescription(`:x: | <@${user.id}> est déjà wl.`)] });
          } else {
            await client.db.push(`${message.guild.id}_wl.whitelisted`, userId);
            message.reply({ embeds: [new MessageEmbed().setColor("2f3136").setDescription(`<@${user.id}> est mtn wl.`)] });
          }
        }
      })
    }
  }
}