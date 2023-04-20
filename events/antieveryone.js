const db = require('../core/db');

module.exports = async (client) => {

//anti everyone
  client.on("messageCreate", async (message) => { 
    const url = message.mentions.everyone;
    if(!url) return;
    if(url ===true) {
      await db.get(`${message.guild.id}_wl`).then(async (data) => {
        if(!data) return;
        const antinuke = await db.get(`${message.guild.id}_antinuke`);
        const trusted = data.whitelisted.includes(message?.author?.id);
        if (message?.author?.id === message.guild.ownerId) return;
        if (message?.author?.id === client.user.id) return;
        if(trusted === message.author.id) return;
        if (antinuke !== true) return;
        if (trusted === true) return;
        if(message.webhookId) return message.delete().catch((_) => { });
        await message.delete().catch((_) => { });
        try{
          await message.guild.members.ban(message.author.id, {
            reason: `Mentioned Everyone/Here | Not Whitelisted`
          }).catch((_) => { });
        }catch(err){
          return;
        }
      });
    };
  });
}