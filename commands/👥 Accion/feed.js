const { EmbedBuilder } = require('discord.js');
const NekosApi = require('nekos.life');
const neko = new NekosApi();
module.exports = {
	name: 'feed',
	alias: [],
	desc: 'Le das de comer a un miembro del server',
	use: '+feed <miembro>',
	async run(client, message, args, color) {
		const user = message.mentions.users.first();

		if (user) {
			if (user != message.author) {
				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} le dio de comer a ${user.username}`
					)
					.setImage((await neko.feed()).url);
				await message.reply({ embeds: [embed] });
			} else {
				message.channel.send(`❌ - Debes mencionar a otro miembro`);
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
	},
};
