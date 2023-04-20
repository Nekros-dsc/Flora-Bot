const mongoose = require('mongoose');
const chalk = require('chalk');
const data = require('../config');

async function connect() {
    mongoose.connect(data.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log(chalk.green(`[MONGO DB] is ready!`))
    });
    return;
}

module.exports = connect