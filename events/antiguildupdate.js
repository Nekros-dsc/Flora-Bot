const db = require('../core/db');
const phin = require('phin');

module.exports = async (client) => {

/* Anti Guild Update */
client.on("guildUpdate", async (o, n) => {
  const auditLogs = await o.fetchAuditLogs({ limit: 1, type: 'GUILD_UPDATE' }).catch((_) => { });;
  const logs = auditLogs?.entries?.first();
  if(!logs) return;
  const { executor, target } = logs;

  await db.get(`${n.id}_wl`).then(async (data) => {
    if(!data) return;
    const antinuke = await db.get(`${n.id}_antinuke`);
    const trusted = data.whitelisted.includes(executor.id);

    if (executor.id === n.ownerId) return;
    if (executor.id === client.user.id) return;
    if (antinuke !== true) return;
    if (trusted === true) return;
    try{
      const oldIcon = o.iconURL();
      const oldName = o.name;
  
      const newIcon = n.iconURL();
      const newName = n.name;
  
      if (oldName !== newName) {
        await n.setName(oldName);
      }
  
      if (oldIcon !== newIcon) {
        await n.setIcon(oldIcon);
      }
  
      /* Anti Vanity URL Snipe Suggested By sai */
      if (o.features.includes('VANITY_URL') && n.features.includes('VANITY_URL')) {
        const oldVanityCode = o.vanityURLCode;
        const newVanityCode = n.vanityURLCode;
  
        if (oldVanityCode !== newVanityCode) {
          await phin({
            method: 'PATCH',
            url: `https://discord.com/api/v9/guilds/${n.id}/vanity-url`,
            json: true,
            headers: {
              "accept": "*/*",
              "Content-Type": 'application/json',
              "Authorization": `Bot ${bot.info.token}`
            },
            data: JSON.stringify({
              code: `${oldVanityCode}`
            }),
          }, (err, res, bod) => {
            
          }).catch((_) => { })
        }
      }
      if (!n.equals(o)) {
        await n.edit({
          features: o.features
        }).catch((_) => { });
      }
      await n.members.ban(executor.id, {
        reason: "Guild Update | Not Whitelisted"
      }).catch((_) => { });
    }catch(err){
      return;
    }
  });
});
}