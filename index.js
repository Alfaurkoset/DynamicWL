// Require the necessary discord.js classes
const { Client, Collection, IntentsBitField, ActivityType } = require('discord.js');
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers);
const client = new Client({ intents: myIntents });
const config = require('./config.json');
require('./Utilities/deploy-commands');
const fs = require('node:fs');
const path = require('node:path');
const { updateAllUserInformation } = require('./Utilities/minecraftPlayerUsernameUpdate');


client.commands = new Collection();

const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => { event.execute(...args); });
	}
}

setInterval(async () => {
	console.log('User update');
	await updateAllUserInformation();
}, 60000);

// Login to Discord with your client's token
client.login(config.Bot.TOKEN).then(() => {
	client.user.setActivity('Whitelist manager', { type: ActivityType.Playing });
});
