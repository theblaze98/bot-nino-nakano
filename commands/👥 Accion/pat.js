const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'pat',
	alias: [],
	desc: 'Acaricias a un miembro del server',
	use: '+pat <miembro>',
	async run(client, message, args, color) {
		const user = message.mentions.users.first();

		if (user) {
			if (user != message.author) {
				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} acaricio a ${user.username}`
					);
				await message.reply({ embeds: [embed] });
			} else {
				message.channel.send(`❌ - No puedes mencionarte a ti mismo`);
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
	},
};
