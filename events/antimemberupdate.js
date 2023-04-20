const db = require('../core/db');

module.exports = async (client) => {

/* Anti Member Update */
client.on("guildMemberUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (n.user.id !== target.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      const oldRoles = o.roles;
      const newRoles = n.roles;
  
      if (oldRoles !== newRoles) {
        await n.roles.set(o.roles.cache).catch((_) => { });
  
        await n.guild.members.ban(executor.id, {
          reason: `Member Role Update | Not Whitelisted`
        }).catch((_) => { });
      }
    }catch(err){
      return;
    }
  });
});
}