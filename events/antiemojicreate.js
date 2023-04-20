const db = require('../core/db');

module.exports = async (client) => {
/* Anti emoji Create */
client.on("emojiCreate", async (emoji) => {
  const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 2, type: 'EMOJI_CREATE' }).catch((_) => { });;
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${emoji.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${emoji.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === emoji.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await emoji.delete().catch((_) => { });
      await emoji.guild.members.ban(executor.id, {
        reason: "Emoji Create | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}