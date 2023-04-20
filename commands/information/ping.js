const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: 'info',
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
            .addField(`**Message Latency**`, `\`\`\`nim\nPinging\`\`\`\u200b`)
            .addField(`\u200b**API Latency**`, `\`\`\`nim\nPinging\`\`\``)
            .setColor(client.color)
        const g = await message.channel.send({embeds: [embed]})

        embed = new MessageEmbed()
            .addField(`**Message Latency**`, `\`\`\`nim\n${g.createdTimestamp - message.createdTimestamp}ms\`\`\`\u200b`)
            .addField(`\u200b**API Latency**`, `\`\`\`nim\n${Math.round(client.ws.ping)}ms\`\`\``)
            .setColor(client.color)
        g.edit({embeds: [embed]})
    }
}