const { EmbedBuilder } = require('discord.js');
const { fetch } = require('undici');
module.exports = {
	name: 'pat',
	alias: [],
	desc: 'Acaricias a un miembro del server',
	use: '+pat <miembro>',
	async run(client, message, args, color) {
		const user = message.mentions.users.first();

		if (user) {
			if (user != message.author) {
				let gif = await fetch('https://api.waifu.pics/sfw/pat')
					.then(r => r.json())
					.then(data => data.url);

				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} acaricio a ${user.username}`
					)
					.setImage(gif);
				await message.reply({embeds: [embed]});
			} else {
				let gif = await fetch('https://api.waifu.pics/sfw/pat')
					.then(r => r.json())
					.then(data => data.url);

				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} acaricio a un ser imaginario`
					)
					.setImage(gif);
				await message.reply({embeds: [embed]});
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
	},
};
