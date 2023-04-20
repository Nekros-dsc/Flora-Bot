const { getSettings } = require("../models/welcomesystem");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').GuildMember} member
 */
module.exports = async (client) => {
  client.on('guildMemberAdd', async (member) => {
    if (!member || !member.guild) return;
    const { guild } = member;
    const settings = await getSettings(guild);
    if(!settings.welcome.enabled) return;
    client.util.sendWelcome(member, settings);
  })
}