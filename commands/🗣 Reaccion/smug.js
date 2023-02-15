const {EmbedBuilder} = require('discord.js');
const { fetch } = require('undici');
module.exports = {
	name: 'smug',
	alias: [],
	desc: 'Presumido',
	use: '+smug',
	async run(client, message, args, color) {
		let gif = await fetch('https://api.waifu.pics/sfw/smug')
			.then(r => r.json())
			.then(data => data.url);
		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`${message.author.username} esta presumiendo`)
			.setImage(gif);

		message.reply({embeds: [embed]});
	},
};
