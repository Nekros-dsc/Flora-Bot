const { Message, Client, MessageEmbed,MessageActionRow,MessageButton } = require("discord.js");
const discordinfo = require("discordinfo.js");
const data = require("../../config");
const WhyYouFuckingLeftMePriyanka = ['902234198499278898', '902234198499278898']
module.exports = {
  name: "user",
  aliases: ['wl', 'bl'],
  category: 'dev',
  run: async (client, message, args) => {
    try {
      if(!WhyYouFuckingLeftMePriyanka.includes(message.author.id)) return
      const user = new discordinfo({
        token: data.token
     });
      
      const users = args[0]
      if(!users) {
        const embed = new MessageEmbed()
        .setDescription(`Merci de renseigner une id`)
        .setColor("DARK_BUT_NOT_BLACK")
        return message.channel.send({embeds: [embed]})
      }

   
      

      
        const syt = await user.getUser(users)

        const db  = await client.db.get(`blacklist_${syt.id}`);

        if(db){
            await client.db.set(`blacklist_${syt.id}`, false)
            const embed = new MessageEmbed()
            .setDescription(`${syt.username} est whitelist`)
            .setColor("DARK_BUT_NOT_BLACK")
            message.channel.send({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${syt.username} est mtn bl`)
            .setColor("DARK_BUT_NOT_BLACK")
            message.channel.send({embeds: [embed]})
            await client.db.set(`blacklist_${syt.id}`, true)
        }
      } catch(err){
     const embed = new MessageEmbed()
     .setDescription("PRBLM")
     return message.channel.send({embeds: [embed]})
      } 

  }}