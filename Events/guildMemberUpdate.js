const { Events } = require('discord.js');
const rconClient = require('../Utilities/rconHandler');

module.exports = {
	name: Events.GuildMemberUpdate,
	execute(oldMember, newMember) {
		const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
		if (removedRoles.size > 0) {
			console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
			rconClient.connect().then(() => {
				rconClient.send('whitelist list').then((response) => {
					console.log('Recon Response: ', response);
				}).catch(err => {
					console.log('An error occurred while sending the query!');
				});
			}).catch(err => {
				console.log('Connection to server cannot be established!');
			});
		}

		const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
		if (addedRoles.size > 0) {
			console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
		}
	},
};
