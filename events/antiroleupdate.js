const db = require('../core/db');

module.exports = async (client) => {

/* Anti Role Update */
client.on("roleUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "ROLE_UPDATE" }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      await n.setPermissions(o.permissions);
      await n.guild.members.ban(executor.id, {
        reason: "Role Update | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}