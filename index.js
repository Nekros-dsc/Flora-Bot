const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, WebhookClient, Intents } = require("discord.js");
const Discord = require("discord.js");

const client = new Client({
  intents: 32767,
});
const wait = require('wait');
const { Database } = require('quickmongo');
const settings = require('./core/settings');
const phin = require('phin').unpromisified;
const chalk = require('chalk');
const { readdirSync } = require("fs");
const util = require('./handler/util.js');
const GiveawayManager = require("./handler/GiveawayManager");
const config = require("./config.json");
//const keepAlive = require("./server");
const express = require('express');

const app = express();


app.get('/', (req, res) => {

  res.send("Flora On Top");
})

client.on('guildDelete', guild => {
  client.channels.fetch('1063831672426086501')
    .then(channel => channel.send({ content: `Bot was kicked out from ${guild.name} (${guild.id})` }))
    .catch(() => console.log('could not send message to logs channel'));
})

client.channels.fetch('1063831672426086501')
  .then(channel => channel.send({ content: `Bot joined ${guild.name} (${guild.id})` }))
  .catch(() => console.log('could not send message to logs channel'));

//function keepAlive(){

app.listen(3000, () => { console.log("Flora Op") });




client.emoji = {
  'tick': '<:yes:1064099802536742923>',
  'cross': '<:no:1064486678556848128>',
  'dot': '<:emoji_62:1064095987058081862>',
  'giveaway': '<a:giveaway:1065171739790823435>',
  'arrow': '<a:arrow:1065603567983013929>'
};






const db = new Database('mongodb+srv://SpaceMusic:shivamop@cluster0.kgvij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
db.connect();
require(`./core/db.js`)

client.giveawaysManager = new GiveawayManager(client);
client.commands = new Collection();
client.slashCommands = new Collection();
client.categories = readdirSync("./commands/");
client.util = new util(client);
client.db = db;
client.color = '#2f3136';
require("./database/connect")();

readdirSync("./events/").forEach(file => {
  let eventName = file.split(".")[0];
  require(`./events/${file}`)(client);
  console.log(`[ EVENTS ] Client event named ${eventName} loaded`);
});

require("./handler")(client);



client.login(config.token);

setInterval(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  }
}, 5000);

module.exports = client;