const { Message, Client, MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    aliases: ['b'],
    category: 'mod',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if (!message.member.permissions.has("BAN_MEMBERS")) {
        return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(` \`Ban Members\` permissions.`)]});
      }
      let isown = message.author.id == message.guild.ownerId;
      const user = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
      let rea = args.slice(1).join(" ") || "No Reason Provided"
      rea = `${message.author.tag} (${message.author.id}) | ` + rea;
      const emisai = new MessageEmbed()
      .setDescription(`User Not Found`)
      .setColor(client.color)
      const saileon = new MessageEmbed()
      .setDescription(`Mention the user first`)
      .setColor(client.color)
      if(!user) return message.reply({embeds: [saileon]})
      if(user === undefined) return message.reply({embeds: [emisai]})
      
      if(user.id === client.user.id) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Tu px pas me ban.`)]})
      
      if(user.id === message.guild.ownerId) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Je px pas ban l'owner`)]})
      if(!client.util.hasHigher(message.member)){
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`t pas haut.`)]});
      }
      if(message.guild.me.roles.highest.position <= user.roles.highest.position && !isown){
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`Je px pas le ban <@${user.id}>.`)]});
      }
      if(message.member.roles.highest.position <= user.roles.highest.position && !isown) {
        return message.channel.send({embeds: [new MessageEmbed().setColor(client.color).setDescription(`tu es plus bas <@${user.id}>`)]});
      }
      
      if(!user.bannable){
        const embed = new MessageEmbed()
        .setDescription(`jpp ban.`)
        .setColor(client.color)
        return message.reply({embeds: [embed]})
    }
    user.ban({reason: rea})
    const done = new MessageEmbed()
    .setDescription(`J'ai ban **${user.user.tag}** du serv.`)
    .setColor(client.color)
    return message.channel.send({embeds: [done]})
    }
};