const { PrismaClient } = require('@prisma/client');
const { getPlayerNamebyID } = require('./minecraft');

const prisma = new PrismaClient();

async function addUser(DiscordUserID, MinecraftPlayer) {
	// ... you will write your Prisma Client queries here
	prisma.minecraft_IGNs.create({
		data:  {
			LatestName: MinecraftPlayer.name,
			PlayerUUID: MinecraftPlayer.UUID,
			DiscordID: DiscordUserID,
		},
	});
}

async function updateUser(PlayerUUID) {
	const newPlayerName = getPlayerNamebyID(PlayerUUID);
	prisma.minecraft_IGNs.update({
		data: {
			LatestName: newPlayerName,
		},
		where: {
			PlayerUUID: PlayerUUID,
		},
	});
}

async function getUser(DiscordUserID) {
	prisma.minecraft_IGNs.findFirst({
		where: {
			DiscordID: DiscordUserID,
		},
	});
}


module.exports = {
	addUser,
	getUser,
	updateUser,
};