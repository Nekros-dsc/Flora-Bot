const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "gend",
  category: 'giveaway',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`Tu dois avoir \`Manage Server\` permissions.`)
      return message.reply({embeds: [error]});
    }
    let messageId = args[0];
    if(!messageId){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${message.guild.prefix}gend <message id>`)]})
    }
    const response = await end(message.member, messageId);
    message.reply(response);
  }
}

async function end(member, messageId){
  const embed = new MessageEmbed();
  embed.setColor(member.client.color);
  if (!messageId) return {embeds: [embed.setDescription("Tu dois pécifier un id valide.")]};

  if (!member.permissions.has("MANAGE_GUILD")) {
    return {embeds: [embed.setDescription("Tu dois avoir `Manage Server` permissions.")]};
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Pas trouvé: \`${messageId}\``)]};

  if (giveaway.ended) return {embeds: [embed.setDescription("Le giveaway est déjà terminé.")]};

  try {
    await giveaway.end();
    return {embeds: [embed.setColor(member.client.color).setDescription(`Giveaway terminé avec succès: \`${messageId}\`!`)]};
  } catch (error) {
    console.log(error);
    return {embeds: [embed.setDescription(`Je ne peux pas terminer le giveaway: \`${messageId}\`!`)]};
  }
}