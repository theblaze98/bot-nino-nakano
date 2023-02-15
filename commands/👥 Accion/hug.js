const {EmbedBuilder} = require('discord.js');
const {fetch} = require('undici');
module.exports = {
	name: 'hug',
	alias: [],
	desc: 'Abrazas a un miembro del server',
	use: '+hug <miembro>',
	async run(client, message, args, color) {
		const user = message.mentions.users.first();

		if (user) {
			if (user != message.author) {
				let gif = await fetch('https://api.waifu.pics/sfw/hug')
					.then(r => r.json())
					.then(data => data.url);

				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} le dio un abrazo a ${user.username}`
					)
					.setImage(gif);
				await message.reply({embeds: [embed]});
			} else {
				let gif = await fetch('https://api.waifu.pics/sfw/hug')
					.then(r => r.json())
					.then(data => (gif = data.url));

				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} le dio un abrazo a un ser imaginario`
					)
					.setImage(gif);
				await message.reply({embeds: [embed]});
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
	},
};
