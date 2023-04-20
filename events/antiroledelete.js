const db = require('../core/db');

module.exports = async (client) => {

/* Anti Role Delete */
client.on("roleDelete", async (role) => {
  const auditLogs = await role.guild.fetchAuditLogs({ limit: 2, type: "ROLE_DELETE" }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${role.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${role.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === role.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    if (role.managed) return;
    try{
      await role.guild.roles.create({ name: role.name, color: role.color }).catch((_) => { });
      await role.guild.members.ban(executor.id, { reason: 'Role Delete | Not Whitelisted' }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}