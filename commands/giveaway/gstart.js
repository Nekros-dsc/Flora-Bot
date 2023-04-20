const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "gstart",
  category: 'giveaway',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_GUILD')){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription("Tu dois avoir `Manage Server` permissions.")
      return message.reply({embeds: [error]});
    }
    if (!message.guild.me.permissions.has(['ADD_REACTIONS', 'USE_EXTERNAL_EMOJI1'])){
      const error = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`Je dois avoir toutes les permissions`)
      return message.reply({embeds: [error]});
    }
    if(!args[2]){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`${message.guild.prefix}gstart \`<duration> <winners> <prize>\``)]})
    }
    let duration = getValue(args[0]) / 60;
    let winners = parseInt(args[1]);
    let prize = String(args.slice(2).join(" "));
    if(duration < 1){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Le giveaway ne peut pas dure moin de \`1m\`.`)]})
    }
    if(isNaN(winners) || winners <= 0){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Au moin \`1\` gagnants.`)]})
    }
    if(prize.length > 256){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Le gw ne peut pas contenir plus de 256 caractères`)]})
    }
    const response = await start(message.member, message.channel, duration, prize, winners, message.member);
    message.reply(response);
  }
}
function getValue(str)
{
  let result = 0;
  var regex = /(\d+[a-z]+)/g;
  match = regex.exec(str);
  while (match != null) {
    var match_str     = match[0];
    var last_char     = match_str[match_str.length-1];
    if ( last_char == 'h' )
      result += parseInt(match_str) * 3600;
    if ( last_char == 'm' )
      result += parseInt(match_str) * 60;
    if ( last_char == 's' )
      result += parseInt(match_str);
    match = regex.exec(str);
  }
  return result;
}
async function start(member, giveawayChannel, duration, prize, winners, host){
  let em = new MessageEmbed()
  .setColor(giveawayChannel.client.color)
  if (!member.permissions.has("MANAGE_GUILD")) {
    return {embeds: [em.setDescription("Tu dois avoir `Manage Server` permissions.")]};;
  }

  if (!giveawayChannel.isText()) {
    return {embeds: [em.setDescription("Seul dans les textchannel")]};
  }

  try {
    let time = Math.round((Date.now() + (60000 * duration))/1000)
    await member.client.giveawaysManager.start(giveawayChannel, {
      duration: 60000 * duration,
      prize,
      winnerCount: winners,
      hostedBy: member,
      messages: {
        giveaway: `${giveawayChannel.client.emoji.giveaway} **GIVEAWAY** ${giveawayChannel.client.emoji.giveaway}`,
        drawing: '',
        winMessage: 'Bien joué, {winners}! Tu as gagné **{this.prize}**!',
        noWinner: `**${giveawayChannel.client.emoji.dot} Fin: <t:${time}:R> (<t:${time}>)\n${giveawayChannel.client.emoji.dot} Hosted By: ${member}\n${giveawayChannel.client.emoji.dot} Winners: No Valid Entry**`,
        giveawayEnded: `${giveawayChannel.client.emoji.giveaway} **GIVEAWAY ENDED** ${giveawayChannel.client.emoji.giveaway}`,
        inviteToParticipate: `**${giveawayChannel.client.emoji.dot} Fin: <t:${time}:R> (<t:${time}>)\n${giveawayChannel.client.emoji.dot} React with ${giveawayChannel.client.emoji.giveaway} to enter\n${giveawayChannel.client.emoji.dot} Hosted By: ${member}\n${giveawayChannel.client.emoji.dot} Winners: ${winners}**`,
        hostedBy: '',
        embedFooter: '',
        winners: `**Ended At: <t:${time}:R> (<t:${time}>)\nWinner(s):**`,
        endedAt: ''
      },
    });

    return { embeds: [new MessageEmbed().setColor(giveawayChannel.client.color).setDescription(`The giveaway for **${prize}** has been started in ${giveawayChannel}.`)] };
  } catch (error) {
    member.client.logger.error("Giveaway Start", error);
    return { embeds: [new MessageEmbed().setColor(`ff0000`).setDescription(`I was unable to start the giveaway. I've contacted my developers to look after this.`)] };
  }
};