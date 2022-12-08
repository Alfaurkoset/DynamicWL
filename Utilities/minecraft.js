module.exports = {
	async getIDbyPlayerName(playerName) {
		return await fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`).then(data => data.json()).then((data) => {
			if (data.error) {
				return new Error('Failed to fetch minecraft user, maybe a typo?');
			}
			return data.id;
		});
	},
	async getPlayerNamebyID(ID) {
		return await fetch(`https://api.mojang.com/user/profile/${ID}`).then(data => data.json()).then((data) => {
			if (data.error) {
				return new Error('Failed to fetch minecraft user, maybe a typo?');
			}
			return data.name;
		});
	},
};