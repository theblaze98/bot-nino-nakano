const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
	name: 'avatar',
	alias: ['avt'],
	desc: 'Muestra tu avatar o el del usuario mencionado',
	use: '+avatar [miembro]',
	async run(client, message, args, color) {
		let user = message.mentions.users.first() || message.author;

		const button = new ButtonBuilder()
			.setLabel('Ver en el navegador')
			.setURL(
				user.displayAvatarURL({
					size: 4096,
					format: 'png',
					dynamic: true,
				})
			)
			.setStyle(5)
			.setEmoji('🌐');

		const row = new ActionRowBuilder().addComponents(button);

		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(`Este es el avatar de ${user.username}\n`)
			.setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});

		await message.reply({ embeds: [embed], components: [row] });
	},
};
