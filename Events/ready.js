const { Events } = require('discord.js');
const config = require('../config.json');
const { updateAllUserInformation } = require('../Utilities/minecraftPlayerUsernameUpdate');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const guild = await client.guilds.fetch(config.Guild.ID);
		await guild.members.fetch();

		updateAllUserInformation();
	},
};
