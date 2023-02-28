const {fetch} = require('undici');
const {EmbedBuilder} = require('discord.js');
module.exports = {
	name: 'hug',
	description: 'Abrazas a alguien',
	options: [
		{
			name: 'member',
			type: 6,
			description: 'Menciona al miembro al que quieres abrazar',
			require: true,
		},
	],
	async execute(client, int, color) {
		const user = int.options.getUser('member');

		if (user != int.user) {
			let gif = await fetch('https://api.waifu.pics/sfw/hug')
				.then(r => r.json())
				.then(data => data.url);

			const embed = new EmbedBuilder()
				.setColor(color)
				.setDescription(
					`${int.user.username} le dio un abrazo a ${user.username}`
				)
				.setImage(gif);
			await int.reply({embeds: [embed]});
		} else if (user === int.user) {
			let gif = await fetch('https://api.waifu.pics/sfw/hug')
				.then(r => r.json())
				.then(data => data.url);

			const embed = new EmbedBuilder()
				.setColor(color)
				.setDescription(
					`${int.user.username} le dio un abrazo a un ser imaginario`
				)
				.setImage(gif);
			await int.reply({embeds: [embed]});
		} else {
			int.reply(`❌ - Debes mencionar a alguien`);
		}
	},
};
