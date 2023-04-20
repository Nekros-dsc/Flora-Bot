const db = require('../core/db');

module.exports = async (client) => {

/* Anti emoji update */
client.on("emojiUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: 'EMOJI_UPDATE' }).catch((_) => { });;
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${n.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${n.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === n.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await n.setName(o.name).catch((_) => { });
      await n.guild.members.ban(executor.id, {
        reason: "Emoji Update | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}