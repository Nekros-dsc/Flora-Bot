const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'),
  st = require('../../core/settings').bot,
  db = require('../../core/db.js');
  const config = require("../../config.json");
const ownerIDS = config.owner


module.exports = {
  name: 'antinuke',
  aliases: ['antiwizz', 'an'],
  run: async (client, message, args) => {
    let prefix = config.prefix;
    arypton = await client.users.fetch(`820361590826205215`,`820361590826205215`); 
    let antiwizz =[]
    let antiwizz2 =[]
    const option = args.join(" ");
    const isActivatedAlready = await db.get(`${message.guild.id}_antinuke`);
    const kickpunish = await db.get(`${message.guild.id}_antinuke_kick`);
    const banpunish = await db.get(`${message.guild.id}_antinuke_ban`);
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const users = [];
    const IDs = user.mention;
    const ID = user.id;
    const whitelisted = await db.get(`${message.guild.id}_wl_${ID}`);

    if (isActivatedAlready) {
            antiwizz.push(`**Anti Ban** \n**Anti Kick** \n**Anti Bot** <\n**Anti Unban** \n**Anti Member Update** \n**Anti Channel-Create** \n**Anti Channel-Delete** \n**Anti Channel-Update** \n**Anti Role-Create** \n**Anti Role-Delete** \n**Anti Role-Update** \n**Anti Webhook-Create** \n**Anti Webhook-Delete** \n**Anti Webhook-Update** \n**Anti Guild-Update** \n\n\n**Anti Prune** \n**Auto Recovery** `)
          }

    if (!isActivatedAlready) {
      antiwizz.push(`**Anti Nuke** ✅`)
    }

    if (kickpunish) {
      antiwizz2.push(`Kick`)
    }

    if (banpunish) {
      antiwizz2.push(`Ban`)

const mentionsomeone = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Merci de mentionner une personne`);
    }

    const eeeee = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({ name: `${message.guild.name} sécurité`, value: `Le serveur a déjà activé les antiraid.\n\nStatus actuel: ✅\n\n> Pour désactiver \`${prefix}antinuke disable\``})

    const eeee = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor('Nova World', client.user.displayAvatarURL())
      .setTitle(message.guild.name)
      .setDescription(`Met mon rôle tout en haut pour que je fonctionne correctement.\n\nAntinuke Paramètre: **ON** | ✅\n\n Punishments:\n\n**Anti Ban:** ✅\n**Anti Kick:** ✅\n**Anti Bot:** ✅\n**Anti Member Update:** ✅\n**Anti Channel-Create:** ✅\n**Anti Channel-Delete:** ✅\n**Anti Channel-Update:** ✅\n**Anti Role-Create:** ✅\n**Anti Role-Delete:** ✅\n**Anti Role-Update:** ✅\n**Anti Webhook:** ✅\n**Anti Guild-Update:** ✅\n\n\n**Anti Prune:** ✅\n**Auto Recovery:** ✅\n\n**Whitelist Settings**\n・Pour whitelist une personne \`${prefix}antinuke whitelist add <user>\`\n・Pour retirer de la whitelist une personne \`${prefix}antinuke whitelist remove <user>\`\n・Montre la list des membres whitelist \`${prefix}antinuke whitelist show\`
`)
      .setFooter(`Pour désactivé ${prefix}antinuke disable`);

    const ddddd = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({ name: `${message.guild.name} Security Settings`, value: `Le serveur a déjà désactivé l'antinule.\n\nStatut actuelle: ❌\n\n> Pour activer \`${prefix}antinuke enable\``})


    const dddd = new MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .addFields({ name: `${message.guild.name} Security Settings`, value: `Successfully disabled Antinuke settings.\n\nStatut actuelle : ❌\n\n> Pour activer \`${prefix}antinuke enable\``})
     // .setFooter(`To enable it use ${prefix}antinuke enable`);
    
    const raja = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(` **Seu l'owner peut utiliser ces commandes.** `)
    
    const guide = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())

      .addField(`Antinuke Toggle`, `> Pour ✅ antinuke: *${prefix}antinuke enable*
> Pour ❌ antinuke: *${prefix}antinuke disable*`)

    const settingss = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`**Antinuke Events Settings**\n\n${antiwizz.join("\n")}`)
    
    const alkick = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`La punnition est déjà **Kick**`);
    
    const alban = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`La punnition est déjà **Ban**`);
    
    const setkick = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`La punnition a été activé sur **Kick**`);
    
    const setban = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`La punnition a été activé sur **Ban**`);
  

const mentionsomeone = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Merci de mentionner une personne`);

const wlist = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`<@${ID}> est maintenant wl`);

const remwlist = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`<@${ID}> est maintenant unwl`);

const alwlist = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`<@${ID}> est déjà wl`);

const nowlist = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`<@${ID}> n'est pas wl`);

const noone = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Personne est wl`);

const remall = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Je suis entrain de retirer tous le monde de la whitelist`);

const whynoone = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`Personne n'est whitelist sur le serveur`);

const guide2 = new MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription(`?whitelist add <user>\n\n?whitelist remove <user>\n\n?whitelist show\n\n?whitelist reset`)
    
    
    const onkrle = new MessageEmbed()
      .setColor('#2f3136')
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`Active d'abord l'antinuke.`);
    

    
    if (!message.guild.ownerId.includes(message.author.id) && !ownerIDS.includes(message.author.id)) {
          return message.channel.send({embeds: [raja]})
    }
    if (message.guild.ownerId.includes(message.author.id) || ownerIDS.includes(message.author.id)) {
      if (!args) {
        return message.channel.send({ embeds: [guide] });
      } else if (args.join(" ") === 'config') {
          return message.channel.send({ embeds: [settingss]})
        } else if (args.join(" ") === 'enable') {
        if (isActivatedAlready) {
          return message.channel.send({ embeds: [eeeee]})
        } else {
          await db.set(`${message.guild.id}_antinuke`, true),
          await db.set(`${message.guild.id}_antinuke_ban`, true);
          return message.channel.send({ embeds: [eeee]});
        }
      } else if (args.join(" ") === 'disable') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [ddddd]})
        } else {
          await db.delete(`${message.guild.id}_antinuke`, true),
          await db.delete(`${message.guild.id}_antinuke_kick`, true),
          await db.delete(`${message.guild.id}_antinuke_kick`, true);
          return message.channel.send({ embeds: [dddd]});
        }
      } else if (args.join(" ") === 'punishment kick') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        } 
        if (kickpunish) {
          return message.channel.send({ embeds: [alkick]});
        } else {
          await db.set(`${message.guild.id}_antinuke_kick`, true),
          await db.delete(`${message.guild.id}_antinuke_ban`, true);
          return message.channel.send({ embeds: [setkick]});
        }
      } else if (args.join(" ") === 'punishment ban') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        } 
        if (kickpunish) {
          return message.channel.send({ embeds: [alban]});
        } else {
          await db.set(`${message.guild.id}_antinuke_ban`, true),
          await db.delete(`${message.guild.id}_antinuke_kick`, true);
          return message.channel.send({ embeds: [setban]});
        }
      } else if (args.join(" ") === 'whitelist show') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
        await db.list(`${message.guild.id}_wl_`).then(async array => {
          if (array.length > 0) {
            for (x in array) {
              const mentions = array[x],
                userId = mentions.split('_')[2],
                User = `<@${userId}> (${userId})`;
              users.push(User);
            }
            const settings = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`**Total wl**\n\n${users.join('\n')}`)
            return message.channel.send({ embeds: [settings] });
          } else {
            return message.channel.send({ embeds: [whynoone] })
          }
        })
      } else if (args.join(" ") === 'wl show') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
        await db.get(`${message.guild.id}_wl_`).then(async array => {
          if (array.length > 0) {
            for (x in array) {
              const mentions = array[x],
                userId = mentions.split('_')[2],
                User = `<@${userId}> (${userId})`;
              users.push(User);
            }
            const settingsss = new MessageEmbed()
      .setColor("#2f3136")
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor(client.user.tag, client.user.displayAvatarURL())
      .setDescription(`**Total WL**\n\n${users.join('\n')}`)
            return message.channel.send({ embeds: [settingsss] });
          } else {
            return message.channel.send({ embeds: [whynoone] })
          }
        })
      } else if (args.join(" ") === `whitelist add <@${ID}>`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (whitelisted) {
          return message.channel.send({ embeds: [alwlist]});
        } else {
          await db.set(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [wlist]});
        }
      } else if (args.join(" ") === `wl add <@${ID}>`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (whitelisted) {
          return message.channel.send({ embeds: [alwlist]});
        } else {
          await db.set(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [wlist]});
        }
      } else if (args.join(" ") === `whitelist add ${ID}`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (whitelisted) {
          return message.channel.send({ embeds: [alwlist]});
        } else {
          await db.set(`${message.guild.id}_wl_${ID}`, { whitelisted: [] });
          return message.channel.send({ embeds: [wlist]});
        }
      } else if (args.join(" ") === `wl add ${ID}`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (whitelisted) {
          return message.channel.send({ embeds: [alwlist]});
        } else {
          await db.set(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [wlist]});
        }
      } else if (args.join(" ") === `whitelist remove <@${ID}>`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (!whitelisted) {
          return message.channel.send({ embeds: [nowlist]});
        } else {
          await db.delete(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [remwlist]});
        }
      } else if (option === `wl remove <@${ID}>`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (!whitelisted) {
          return message.channel.send({ embeds: [nowlist]});
        } else {
          await db.delete(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [remwlist]});
        }
      } else if (args.join(" ") === `whitelist remove ${ID}`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (!whitelisted) {
          return message.channel.send({ embeds: [nowlist]});
        } else {
          await db.delete(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [remwlist]});
        }
      } else if (option === `wl remove ${ID}`) {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        }
         if (!whitelisted) {
          return message.channel.send({ embeds: [nowlist]});
        } else {
          await db.delete(`${message.guild.id}_wl_${ID}`, true);
          return message.channel.send({ embeds: [remwlist]});
        }
      } else if (args.join(" ") === 'whitelist reset') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        } else {
          db.list(`${message.guild.id}_wl_`).then((keys) => {
            keys.forEach(async (key) => {
              await db.delete(`${key}`)
              })
            });
          return message.channel.send({ embeds: [remall]});
        }
      } else if (args.join(" ") === 'wl reset') {
        if (!isActivatedAlready) {
          return message.channel.send({ embeds: [onkrle]})
        } else {
          db.list(`${message.guild.id}_wl_`).then((keys) => {
            keys.forEach(async (key) => {
              await db.delete(`${key}`)
              })
            });
          return message.channel.send({ embeds: [remall]});
        }
      } else {
      return message.channel.send({ embeds: [guide]});
    }
  }
}
}