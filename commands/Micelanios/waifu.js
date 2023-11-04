const {EmbedBuilder} = require('discord.js');
const {fetch} = require('undici');
module.exports = {
	name: 'waifu',
	alias: ['wa'],
	desc: 'Muestra una imagen de una waifu al azar',
	use: '+waifu',
	async run(client, message, args, color) {
		const gif = await fetch('https://api.waifu.pics/sfw/waifu')
			.then(r => r.json())
			.then(data => data.url);

		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription('waifu')
			.setImage(gif);

        await message.reply({embeds: [embed]});
	},
};
