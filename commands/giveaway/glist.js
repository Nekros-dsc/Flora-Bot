const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "glist",
  category: 'giveaway',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription("Tu dois avoir `Manage Server` permissions.")
      return message.reply({embeds: [error]});
    }
    const response = await list(message.member);
    message.reply(response);
  }
}

async function list(member){
  const embed = new MessageEmbed();
  embed.setColor(member.client.color);
  
  if (!member.permissions.has("MANAGE_GUILD")) {
    return {embeds: [embed.setDescription("Tu dois avoir `Manage Server` permissions.")]};
  }

  const giveaways = member.client.giveawaysManager.giveaways.filter(
    (g) => g.guildId === member.guild.id && g.ended === false
  );

  if (giveaways.length === 0) {
    embed.setColor(member.client.color);
    return {embeds: [embed.setDescription("Pas de giveaway!")]};
  }

  let description = giveaways.map((g, i) => `${member.client.emoji.dot} [\`${g.messageId}\`](https://discord.com/channels/${g.guildId}/${g.channelId}/${g.messageId}) | <#${g.channelId}> | **${g.winnerCount}** winner(s) | Prix: **${g.prize}** | Host: ${g.hostedBy} | Fin <t:${Math.round(g.endAt/1000)}:R>`).join("\n");
  embed.setTitle(`**__Active Giveaways__**`)
  embed.setDescription(description)
  try {
    return {embeds: [embed]};
  } catch (error) {
    member.client.logger.error("Giveaway List", error);
    return {embeds: [embed.setDescription(`ERREUR !`)]};
  }
}