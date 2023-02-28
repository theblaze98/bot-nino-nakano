const {EmbedBuilder} = require('discord.js');
const config = require('../../config.json');
const { fetch } = require('undici');
module.exports = {
	name: 'kiss',
	alias: [],
	desc: 'Le das un beso a un miembro del server',
	use: '+kiss <miembro>',
	async run(client, message, args, color) {
		const user = message.mentions.users.first();

		if (user) {
			if (user != message.author) {
				if (
					user.id === client.user.id &&
					message.author.id === process.env.AUTHOR_ID
				) {
					let gif = await fetch('https://api.waifu.pics/sfw/kiss')
						.then(r => r.json())
						.then(data => data.url);
					const embed = new EmbedBuilder()
						.setColor(color)
						.setDescription(
							`${message.author.username} me gusta como me besas`
						)
						.setImage(gif);
					await message.reply({embeds: [embed]});
				} else if (user.id === client.user.id) {
					message.channel.send(
						`❌ - Lo siento pero debes mencionar a alguien mas`
					);
				} else {
					let gif = await fetch('https://api.waifu.pics/sfw/kiss')
						.then(r => r.json())
						.then(data => data.url);
					const embed = new EmbedBuilder()
						.setColor(color)
						.setDescription(
							`${message.author.username} le dio un beso a ${user.username}`
						)
						.setImage(gif);
					await message.reply({embeds: [embed]});
				}
			} else {
				message.channel.send(`❌ - Te besaras a ti mismo?`);
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
	},
};
