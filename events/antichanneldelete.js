const db = require('../core/db');

module.exports = async (client) => {
/* Anti Channel Delete */
client.on("channelDelete", async (channel) => {
  const auditLogs = await channel.guild.fetchAuditLogs({ limit: 2, type: 'CHANNEL_DELETE' }).catch((_) => { });
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${channel.guild.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${channel.guild.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);
    
    if (executor.id === channel.guild.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;

    channel.clone().then(ch => ch.setPosition(channel.position));
    try{
      await channel.guild.members.ban(executor.id, {
        reason: "Channel Delete | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}