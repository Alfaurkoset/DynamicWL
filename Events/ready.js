const { Events } = require('discord.js');
const { updateAllUserInformation } = require('../Utilities/minecraftPlayerUsernameUpdate');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		setInterval(async () => {
			console.log('User update');
			await updateAllUserInformation();
		}, 60000);
	},
};
