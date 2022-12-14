/* eslint-disable no-case-declarations */
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getUser, addUser, prisma } = require('../Utilities/database');
const { getPlayerNamebyID } = require('../Utilities/minecraft');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register-admin')
		.setDescription('Register someone as an admin')
		.addStringOption(option =>
			option
				.setName('uuid')
				.setDescription('UUID of the user')
				.setRequired(true))
		.addUserOption(option =>
			option
				.setName('member')
				.setDescription('registered discord user')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
	async execute(interaction) {
		const user = interaction.options.getMember('member');
		const dbResult = await getUser(user.id).catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
		let minecraftPlayer = {};
		console.log('DB Result: ', dbResult);
		if (dbResult != null || dbResult != []) {
			await interaction.reply({ content: `${interaction.options.getUser('member')} is already registered` });
			return;
		}
		async function errorHandler(Error) {
			console.error(Error);
			await interaction.reply({ content: 'something went wrong | maybe a typo?', ephemeral: true });
		}
		minecraftPlayer = {
			name: await getPlayerNamebyID(interaction.options.getString('uuid')).then(uuid => uuid).catch(error => errorHandler(error)),
			id: interaction.options.getString('uuid'),
		};
		await addUser(interaction.options.getUser('member').id, minecraftPlayer);
		await interaction.reply({ content: `${interaction.options.getUser('member')} successfully registered with username of ${minecraftPlayer.name}` });
	},
};