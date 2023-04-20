const {
    MessageEmbed,
    Message,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Client
} = require("discord.js");
const Settings = require('../../core/settings.js');
const client = require('../../index');
const db = require('../../core/db');

module.exports = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  run: async (client, message, args) => {




    let embed = new MessageEmbed()
      .setColor("2f3136")
.setTitle(`Flora`)
            //.setAuthor()
      .setDescription(`**__Antinuke__**:\n\`antinuke\` - \`whitelist\` - \`unwhitelist\` - \`whitelisted\` - \`whitelistreset\`\n\n**__Givaways__**:\n\`gend\` - \`glist\` - \`greroll\` - \`gstart\`\n\n**__Image__**:\n\`dog\`\n\n**__Infos__**:\n\`addemoji\` - \`afk\` - \`avatar\` - \`banner\` - \`emojilist\` - \`firstmsg\` - \`guildbanner\` \`help\` - \`membercount\` - \`ping\` - \`profile\` - \`roleinfo\` - \`servericon\` - \`serverinfo\` - \`uptime\` - \`userinfo\`\n\n**__Mods__**:\n\`ban\` - \`hide\` - \`hideall\` - \`kick\` - \`list\` - \`lock\` - \`lockall\` \`mute\` - \`nuke\` - \`prefix\` - \`purge\` - \`purgebot\` - \`unban\` - \`unbanall\` - \`unhide\` - \`unhideall\` - \`unlock\` - \`unlockall\` - \`unmute\`\n\n**__Vocal__**:\n\`vcdeafen\` - \`vckick\` - \`vclist\` - \`vcmute\` - \`vcdeafen\` - \`vcunmute\`\n\n**__Welcome__**:\n\`welcome\` - \`welcomechannel\` - \`welcomemessage\` - \`welcomereset\` - \`welcometest\``)
    .setFooter(`Nova world`, `${client.user.displayAvatarURL({ dynamic: true, size: 512 })}`) 
    //.setTimestamp()

    let menumsg = await message.channel.send({ embeds: [embed]});


  }
}