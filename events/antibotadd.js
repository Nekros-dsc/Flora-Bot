const {  MessageEmbed } = require("discord.js")
const db = require('../core/db');


module.exports = async (client) => {
  

/* Anti Bot Add */
client.on("guildMemberAdd", async (member) => {
  const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;
  
  await db.get(`${member.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${member.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (!logs) return;
    if (executor.id === member.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (!target.bot) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (target.id !== member.id) return;
    try{
      await member.guild.members.ban(executor.id, {
        reason: "Bot Add | Not Whitelisted"
      }).catch((_) => { });
      await member.guild.members.ban(target.id, {
        reason: "Illegal Bot | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}