const db = require('../core/db');
module.exports = async (client) => {

/* Anti Webhook Delete */
client.on("webhookUpdate", async (webhook) => {
  const auditLog = await webhook.guild.fetchAuditLogs({ limit: 2, type: "WEBHOOK_DELETE" }).catch((_) => { });
  const logs = auditLog?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;
  if(!logs) return;
  await db.get(`${webhook.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${webhook.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === webhook.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await webhook.guild.members.ban(executor.id, {
        reason: "Webhook Delete | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}