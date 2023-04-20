const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "greroll",
  category: 'giveaway',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription("Tu dois avoir `Manage Server` permissions.")
      return message.reply({embeds: [error]});
    }
    let messageId = args[0];
    if(!messageId){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${message.guild.prefix}greroll <message id>`)]})
    }
    const response = await reroll(message.member, messageId);
    message.reply(response);
  }
}

async function reroll(member, messageId){
  const embed = new MessageEmbed();
  embed.setColor(member.client.color);
  if (!messageId) return {embeds: [embed.setDescription("Merci de rentrer un id de message valide.")]};

  if (!member.permissions.has("MANAGE_GUILD")) {
    return {embeds: [embed.setDescription("Tu dois avoir `Manage Server` permissions.")]};
  }

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [embed.setDescription(`Je n'ai pas trouvé: \`${messageId}\``)]};

  if (!giveaway.ended) return {embeds: [embed.setDescription("Le giveaway n'est pas encore terminé.")]};

  try {
    await giveaway.reroll();
    return {embeds: [embed.setColor(member.client.color).setDescription(`Reroll avec succès: \`${messageId}\`!`)]};
  } catch (error) {
    member.client.logger.error("Giveaway Reroll", error);
    return {embeds: [embed.setDescription(`Impossible de reroll: \`${messageId}\`!`)]}
  }
}