const { getUser, prisma, getAllUsers, updateUser } = require('./Database');

module.exports = {
	async updateUserInformation(DiscordUserID) {
		const dbResult = await getUser(DiscordUserID).catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
		dbResult.forEach(user => {
			updateUser(user.PlayerUUID);
		});
	},
	async updateAllUserInformation() {
		const allUsers = await getAllUsers().catch (async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
		allUsers.forEach(user => {
			updateUser(user.PlayerUUID);
		});
	},
};