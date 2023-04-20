const client = require('../index'),
  st = require("../core/settings"),
  db = require('../core/db.js');
module.exports = async (client) => {
    /* On guild join */
    client.on('guildCreate', async (guild) => {
        await client.db.set(`${guild.id}_wl`, { whitelisted: [] });
        await client.db.set(`${guild.id}_antinuke`, false);
    });

    /* On guild leave */
    client.on('guildDelete', async (guild) => {
        await client.db.set(`${guild.id}_wl`, null);
        await client.db.set(`${guild.id}_antinuke`, false);
    });
}