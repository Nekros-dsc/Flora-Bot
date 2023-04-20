const { Database } = require('quickmongo');
const config = require('../config.json');
const db = new Database(config.mongo);
db.connect().then(() => console.log('[ MONGO DB ] Connected to Mongo Database!'));

module.exports = db;