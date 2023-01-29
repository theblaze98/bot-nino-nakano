const { EmbedBuilder } = require('discord.js');
const gifs = [
	'https://media.tenor.com/Y-Fb7Yu9yzAAAAAC/nakano-nino-nino-nakano.gif',
	'https://media.tenor.com/-oi6h0ivb0cAAAAC/nino-nakano.gif',
	'https://media.tenor.com/Ib-6zzFy7LEAAAAC/nino-nakano-the-quintessential-quintuplets.gif',
	'https://media.tenor.com/2Y-jDlehTzUAAAAC/nino-nakano-nino.gif',
	'https://media.tenor.com/smuD5zhDES0AAAAC/nino-nakano.gif',
];
module.exports = {
	name: 'ping',
	description: 'Muestra la latencia del bot',
	options: [],
	async execute(client, int, color) {
		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(
				`Hola ${int.user.username} mi latencia es de *${client.ws.ping}ms*`
			)
			.setImage(gifs[Math.floor(Math.random() * 5)])
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});
		await int.reply({ embeds: [embed] });
	},
};
