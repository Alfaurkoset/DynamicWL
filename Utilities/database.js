const { PrismaClient } = require('@prisma/client');
const { getPlayerNamebyID } = require('./minecraft');

const prisma = new PrismaClient();

async function main() {
	const allUsers = await prisma.minecraft_IGNs.findMany();
	console.log(allUsers);
}

main().then(async () => {
	await prisma.$disconnect();
})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

async function addUser(DiscordUserID, MinecraftPlayer) {
	// ... you will write your Prisma Client queries here
	await prisma.minecraft_IGNs.create({
		data:  {
			LatestName: MinecraftPlayer.name,
			PlayerUUID: MinecraftPlayer.id,
			DiscordID: DiscordUserID,
		},
	});
}

async function updateUser(PlayerUUID) {
	const newPlayerName = await getPlayerNamebyID(PlayerUUID);
	const oldUser = await getUserbyUUID(PlayerUUID);
	await prisma.minecraft_IGNs.update({
		where: { ID: oldUser.ID },
		data: { LatestName: newPlayerName },
	});
}

async function getUserbyUUID(PlayerUUID) {
	return await prisma.minecraft_IGNs.findFirst({
		where: {
			PlayerUUID: PlayerUUID,
		},
	});
}

async function getUser(DiscordUserID) {
	return await prisma.minecraft_IGNs.findFirst({
		where: {
			DiscordID: DiscordUserID,
		},
	});
}

async function getAllUsers() {
	return await prisma.minecraft_IGNs.findMany();
}


module.exports = {
	prisma,
	addUser,
	getUser,
	updateUser,
	getAllUsers,
};