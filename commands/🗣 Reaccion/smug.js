const { EmbedBuilder } = require('discord.js');
const NekosApi = require('nekos.life');
const neko = new NekosApi();
module.exports = {
	name: 'smug',
	alias: [],
	desc: 'Presumido',
	use: '+smug',
	async run(client, message, args, color) {
		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`${message.author.username} esta presumiendo`)
			.setImage((await neko.smug()).url);

		message.reply({ embeds: [embed] });
	},
};
