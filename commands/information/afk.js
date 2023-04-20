const { MessageEmbed } = require("discord.js");
const db = require("../../models/afk.js")

module.exports = {
  name: "afk",
  description: "AFK",
  category: 'info',
  run: async (client, message, args) => {
    const data = await db.findOne({ Guild: message.guildId, Member: message.author.id })
    const reason = args.join(" ") ? args.join(" ") : "Je suis AFK :)"
    if (data) {
      const embed = new MessageEmbed()
      .setTitle("UwU, tu es déjà AFK.")
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    } else {
      const newData = new db({
        Guild: message.guildId,
        Member: message.author.id,
        Reason: reason,
        Time: Date.now()
      })
      await newData.save()
      const embed = new MessageEmbed()
      .setDescription(`L'afk a été mis pour **${reason}**`)
      .setColor(client.color)
      return message.reply({ embeds: [embed] })
    }
  }
}