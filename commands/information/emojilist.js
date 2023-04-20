const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojilist",
  aliases: ['emojis'],
  category: 'info',
  run: async (client, message, args) => {
    
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    };
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    const emojis = message.guild.emojis;
        if (emojis.cache.size == 0) return message.channel.send(`Pas d'emoji`);

    
    let Embed1 = new MessageEmbed()
      .setAuthor({ name: `Emoji List For ${message.guild.name}` })
      .setDescription(`Emoji animé \`[${Animated}]\`\n${EmojisAnimated}\n\nEmoji normal \`[${EmojiCount}]\`\n${Emojis}`)
      .setColor(client.color);

    message.channel.send({embeds: [Embed1]});

  }
}