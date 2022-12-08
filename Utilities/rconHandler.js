const Rcon = require('minecraft-rcon-client');
const config = require('../config.json');
const client = new Rcon(config.Server);

module.exports = client;