const db = require('../core/db');

module.exports = async (client) => {

/* Anti Channel Update */
client.on("channelUpdate", async (o, n) => {
  const auditLogs = await n.guild.fetchAuditLogs({ limit: 2, type: "CHANNEL_UPDATE" }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${o.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${o.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === o.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    const oldName = o.name;
    const newName = n.name;
    try{
      await n.guild.members.ban(executor.id, {
        reason: "Channel Update | Not Whitelisted"
      }).catch((_) => { });
  
      if (oldName !== newName) {
        await n.edit({
          name: oldName
        })
      }
      if (n.isText()) {
        const oldTopic = o.topic;
        const newTopic = n.topic;
        if (oldTopic !== newTopic) {
          await n.setTopic(oldTopic).catch((_) => { });
        }
      }
    }catch(err){
      return;
    }
  });
});
}