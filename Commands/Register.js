const { SlashCommandBuilder } = require('@discordjs/builders');
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
					{ name: 'UUID', value: 'UUID' },
					{ name: 'Username', value: 'Username' },
				)
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('username-uuid')
				.setDescription('Username or UUID of the user')
				.setRequired(true)),
	async execute(interaction) {
		const client = interaction.client;
		switch (interaction.options.getString('input-type')) {
		case 'UUID':
			console.log('UUID');
			console.log('User: ', await getPlayerNamebyID(interaction.options.getString('username-uuid')));
			break;
		case 'Username':
			// eslint-disable-next-line no-case-declarations
			const minecraftPlayer = await getIDbyPlayerName(interaction.options.getString('username-uuid')).catch(Error => {return Error;});
			console.log(minecraftPlayer);
			break;
		}
		await interaction.reply('Hello!');
	},
};