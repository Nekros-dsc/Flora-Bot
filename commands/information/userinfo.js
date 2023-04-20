const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "To Get Information About A User",
    run: async (client, message, args) => {
        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.displayAvatarURL({dynamic: true});
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "DISCORD_EMPLOYEE": "<:discord_employee:1026903789262880800>",
            "DISCORD_PARTNER": "<:partners:1026903940685627443>",
            "BUGHUNTER_LEVEL_1": "<:bug_hunter:1026904095895859240>",
            "BUGHUNTER_LEVEL_2": "<:BugHunter2:1026904223234932806>",
            "HYPESQUAD_EVENTS": "<:hypesquad_events:1026904392022102086>",
            "HOUSE_BRILLIANCE": "<:brilliance:1026904485819326595>",
            "HOUSE_BRAVERY": "<:bravery:1026904604660748369>",
            "HOUSE_BALANCE": "<:balance:1026904705890254859>",
            "EARLY_SUPPORTER": "<:EarlySupporter:1026904834663788674>",
            "TEAM_USER": "<:TEAM_USER:1026905011298504855>",
            "VERIFIED_BOT": "<:VerifiedBot:1026905121042477106>",
            "EARLY_VERIFIED_DEVELOPER": "<:BotDeveloper:1026905242618576956>"
        };
        var bot = {
            "true": "Bot",
            "false": "Human"
        };
        const userFlags = message.member.user.flags.toArray();
        const userlol = new MessageEmbed()
        .setAuthor({ name: `${mention.user.username}'s Information`, iconURL: mention.user.avatarURL()}) 
        .setThumbnail(usericon)
        .addField(`General Information`, `Name: \`\`${mention.user.username}\`\`\nDiscriminator: \`${mention.user.discriminator}\` \nNickname: \`${nick}\``)
        .addField(`Overview`, `Badges: ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}\nType: ${bot[mention.user.bot]}`)
        .addField(`Server Relating Information`, `Roles: ${mention._roles[0] ? `<@&${mention._roles.join(">  <@&")}>` : `\`No roles\``}  \nKey Permissions: \`${finalPermissions.join(', ')}\``)
        .addField(`Misc Information`, `Created On: <t:${Math.round(mention.user.createdTimestamp/1000)}:R>\nJoined On: <t:${Math.round(mention.joinedTimestamp/1000)}:R>`)
        .setThumbnail(mention.user.avatarURL())
        .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true}) })
        .setTimestamp()
        .setColor(client.color);
        message.reply({ embeds: [userlol] })
    }
}