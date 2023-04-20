const db = require('../core/db');

module.exports = async (client) => {
/* Anti sticker Create */
client.on("stickerCreate", async (sticker) => {
  const auditLogs = await sticker.guild.fetchAuditLogs({ limit: 2, type: 'STICKER_CREATE	' }).catch((_) => { });;
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${sticker.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${sticker.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === sticker.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await sticker.delete()
      await sticker.guild.members.ban(executor.id, {
        reason: "Sticker Create | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}