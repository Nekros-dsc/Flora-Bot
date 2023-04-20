const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "list",
  aliases: ['l'],
  category: `mod`,
  run: async (client, message, args) => {
    if(!args[0]){
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't provided the list type.\nList Options: \`admin\`,\`bot\`, \`inrole\``)]})
    }
    const require = args[0].toLowerCase();
    if (require  === "admin" || require == 'admins' || require == 'administration') {
      const administrators = message.guild.members.cache.filter((member) =>
 member.permissions.has('ADMINISTRATOR')
);
      const embed = new MessageEmbed()
      .setTitle("List For Admin In This Server")
      .setDescription(`${administrators.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if (require === "bot" || require == 'bots') {
      const bot = message.guild.members.cache.filter((member) => member.user.bot)
      if(!bot) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`I guess there is no bots in this server.`)]});
      const embed = new MessageEmbed()
      .setTitle("List Of Bots In This Server")
      .setDescription(`${bot.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if (require === "inrole" || require == 'role') {
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || await message.guild.roles.fetch(args[1]);
      if(!role) return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`No roles found.`)]});
      const embed = new MessageEmbed()
      .setTitle(`Members Having ${role.name}:`)
      .setDescription(`${role.members.map(({ id }) => `<@${id}> | ${id}`).join('\n')}`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }

    if(require == 'ban' || require == 'bans'){
      let bans = await message.guild.bans.fetch();
      let ban = bans.map(us => `[${us.user.username}](https://discord.com/users/${us.user.id}) | ${us.user.id}`);
      if(!ban[0]){
        return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`There are no users banned`)]})
      }
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription('**' + ban.join('\n') + '**').setTitle(`List Of Ban Members In ${message.guild.name}`)]});
    }

    else{
      return message.reply({embeds: [new MessageEmbed().setColor(client.color).setDescription(`You didn't provided the list type.\nList Options: \`admin\`,\`bot\`, \`inrole\``)]})
    }
  }
}