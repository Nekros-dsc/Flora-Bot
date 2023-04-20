const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'unwhitelist',
  aliases: ['unwl'],
  category: 'security',
  run: async (client, message, args) => {
    
    const uwl = new MessageEmbed()
      .setColor(client.color)
      .setTitle(`__**Unwl Commandes**__`)
      .setDescription(`**Retirer qqn de la whitelist**`)
      .addFields([
        { name: `__**Utilisation**__`, value: `\`${message.guild.prefix}unwhitelist @user\`\n\`${message.guild.prefix}unwl @user\`` }
      ])
    
    if (message.author.id !== message.guild.ownerId) {
      return message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`${client.emoji.cross} | Only owner of this server can use this command.`)]});
    } else {
      const antinuke = await client.db.get(`${message.guild.id}_antinuke`);
      if (!antinuke) {
         const dissable = new MessageEmbed()
          .setColor(client.color)
           //.setTitle({message.guil)
          .setDescription(`**${message.guild.name}**\n \`\`\`Ohh NO! Le serveur n'a pas activé l'antinule\`\`\`
Statut actuelle : :x:

Pour activer : antinuke enable ** `)
      } else {
        await client.db.get(`${message.guild.id}_wl`).then(async (data) => {
          if (!data) {
            await client.db.set(`${message.guild.id}_wl`, { whitelisted: [] });
            return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(` Merci de réutiliser la commande.`)]})
          } else {
            const user = message.mentions.users.first();
            if (!user) {
              message.reply({ embeds: [uwl] });
            } else {
              const userId = user.id;
              
              if (!data.whitelisted.includes(userId)) {
                message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<@${user.id}> n'est pas whitelist.`)] });
              } else {
                await client.db.pull(`${message.guild.id}_wl.whitelisted`, userId);
                 message.reply({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<@${user.id}> est unwl.`)] });
              }
            }
          }
        })
      }
    }
  }
}