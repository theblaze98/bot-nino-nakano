const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'smug',
	alias: [],
	desc: 'Presumido',
	use: '+smug',
	async run(client, message, args, color) {
		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`${message.author.username} esta presumiendo`);

		message.reply({ embeds: [embed] });
	},
};
