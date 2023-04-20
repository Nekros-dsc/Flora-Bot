const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "mute",
  aliases: ["timeout"],
  category: 'mod',
  run: async (client, message, args) => {
    if (!message.member.permissions.has("TIMEOUT_MEMBERS")) {
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You must have \`Timeout Members\` permissions to use this command.`)]})
    }
    if(!message.guild.me.permissions.has('TIMEOUT_MEMBERS')){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`I must have \`Timeout Members\` permissions to run this command.`)]})
    }
    let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    if(!member){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't mentioned the member whom you want to mute.`)]})
    }
    const minutes = getValue(args[1]) / 60;
    if(minutes < 1){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`The duration of mute must not be less than \`1m\`.`)]})
    }
    let reason = args.slice(2).join(" ").trim();
    if(!reason) reason = "No Reason";
    reason = `${message.author.tag} (${message.author.id}) | ` + reason;
    const response = await timeout(message.member, member, minutes, reason);
    await message.reply(response);
  }
};
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
};
async function timeout(issuer, target, minutes, reason) {
  const response = await timeoutTarget(issuer, target, minutes, reason);
  if (typeof response === "boolean") return getEmbed(`Successfully muted <@${target.user.id}>!`, target.client);
  if (response === "BOT_PERM") return getEmbed(`I do not have permission to mute <@${target.user.id}>`, target.client);
  else if (response === "MEMBER_PERM") return (getEmbed`You do not have permission to mute <@${target.user.id}>`, target.client);
  else if (response === "ALREADY_TIMEOUT") return getEmbed(`<@${target.user.id}> is already muted!`, target.client);
  else return getEmbed(`I don't have enough perms to mute <@${target.user.id}>.`, target.client);
};
function memberInteract(issuer, target) {
  const { guild } = issuer;
  if (guild.ownerId === issuer.id) return true;
  if (guild.ownerId === target.id) return false;
  return issuer.roles.highest.position > target.roles.highest.position;
};
async function timeoutTarget(issuer, target, minutes, reason) {
  if (!memberInteract(issuer, target)) return "MEMBER_PERM";
  if (!memberInteract(issuer.guild.me, target)) return "BOT_PERM";
  if (target.communicationDisabledUntilTimestamp - Date.now() > 0) return "ALREADY_TIMEOUT";

  try {
    await target.timeout(minutes * 60 * 1000, reason);
    return true;
  } catch (ex) {
    return "ERROR";
  }
};
function getEmbed(title, client){
  let embed = new MessageEmbed()
  .setColor(client.color)
  .setDescription(title)
  return { embeds: [embed] };
}