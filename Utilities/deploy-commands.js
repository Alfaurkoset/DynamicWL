const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("../config.json")

const deploy = (client, Collection) => {
    client.commands = new Collection();
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command)
    }

    const rest = new REST({ version: '9' }).setToken(config.Bot.TOKEN);

    rest.put(Routes.applicationGuildCommands(config.Bot.CLIENT_ID, config.Guild.ID), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

module.exports = deploy;