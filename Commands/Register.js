/* eslint-disable no-case-declarations */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUser, addUser, prisma } = require('../Utilities/database');
const { getIDbyPlayerName, getPlayerNamebyID } = require('../Utilities/minecraft');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register your IGN with your minecraft username or uuid')
		.addStringOption(option =>
			option
				.setName('input-type')
				.setDescription('Whitch type are you registering UUID or username [username]')
				.addChoices(
					{ name: 'Username', value: 'Username' },
					{ name: 'UUID', value: 'UUID' },
				)
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('username-uuid')
				.setDescription('Username or UUID of the user')
				.setRequired(true)),
	async execute(interaction) {
		let minecraftPlayer = {};
		if (getUser(interaction.user.id).then(async () => {
			await prisma.$disconnect();
		}).catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		}) != []) {
			await interaction.reply({ content: 'you\'re been registered', ephemeral: true });
			return;
		}
		async function errorHandler(Error) {
			console.error(Error);
			await interaction.reply({ content: 'something went wrong | maybe a typo?', ephemeral: true });
		}
		switch (interaction.options.getString('input-type')) {
		case 'UUID':
			minecraftPlayer = {
				name: await getPlayerNamebyID(interaction.options.getString('username-uuid')).then(uuid => uuid).catch(error => errorHandler(error)),
				id: interaction.options.getString('username-uuid'),
			};
			await addUser(interaction.user.id, minecraftPlayer);
			await interaction.reply({ content: `User successfully registered with username of ${minecraftPlayer.name}`, ephemeral: true });
			break;
		case 'Username':
			minecraftPlayer = {
				name: interaction.options.getString('username-uuid'),
				id: await getIDbyPlayerName(interaction.options.getString('username-uuid')).catch(error => errorHandler(error)),
			};
			addUser(interaction.user.id, minecraftPlayer).then(async () => {
				await prisma.$disconnect();
			}).catch(async (e) => {
				console.error(e);
				await prisma.$disconnect();
				process.exit(1);
			});
			await interaction.reply({ content:`User successfully registered with username of ${minecraftPlayer.name}`, ephemeral: true });
			break;
		}
	},
};