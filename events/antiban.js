const {  MessageEmbed } = require("discord.js")
const db = require('../core/db');

module.exports = async (client) => {
/* Anti Member Ban */
client.on("guildBanAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 2, type: "MEMBER_BAN_ADD" }).catch((_) => { });;
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${member.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${member.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await member.guild.members.ban(executor.id, {
        reason: "Member Ban | Not Whitelisted"
      }).catch((_) => { });
      await member.guild.members.unban(target.id).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}