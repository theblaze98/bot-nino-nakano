// Este slashcommand se encarga de mostrar el avatar de un miembro
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Muestra tu avatar o el de un miembro del servidor',
	options: [
		{
			name: 'member',
			type: 6,
			description: 'Menciona al miembro del q quieres el avatar',
			require: false,
		},
	],
	async execute(client, int, color) {
		// Obtenemos el usuario mencionado y en caso de no encontrarlo el usuario que uso el comando
		let user = int.options.getUser('member') || int.user;

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
			// Obtenemos el avatar del usuario y lo asignamos al embed
			.setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});
		await int.reply({ embeds: [embed], components: [row] });
	},
};
