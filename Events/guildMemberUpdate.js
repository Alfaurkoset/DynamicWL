/* eslint-disable no-unused-vars */
const { Events } = require('discord.js');
const { getUser } = require('../Utilities/Database');
const rconClient = require('../Utilities/rconHandler');

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute(oldMember, newMember) {
		const minecraftPlayer = await getUser(newMember.id);
		const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
		if (removedRoles.size > 0) {
			console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
			removedRoles.map(r => {
				if (r.id == '922872112857882646') {
					rconClient.connect().then(() => {
						rconClient.send(`whitelist remove ${minecraftPlayer.LatestName}`).then((response) => {
							console.log('Recon Response: ', response);
							rconClient.disconnect();
						}).catch(err => {
							console.log('An error occurred while sending the query!');
						});
					}).catch(err => {
						console.log('Connection to server cannot be established!');
					});
				}
			});
		}

		const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
		if (addedRoles.size > 0) {
			console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
			addedRoles.map(r => {
				if (r.id == '922872112857882646') {
					rconClient.connect().then(() => {
						rconClient.send(`whitelist add ${minecraftPlayer.LatestName}`).then((response) => {
							console.log('Recon Response: ', response);
						}).catch(err => {
							console.log('An error occurred while sending the query!');
						});
					}).catch(err => {
						console.log('Connection to server cannot be established!');
					});
				}
			});
		}
	},
};
