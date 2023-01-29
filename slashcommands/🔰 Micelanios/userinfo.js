const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'userinfo',
	description: 'Muestra la informacion de un miembro del server',
	options: [
		{
			name: 'member',
			type: 6,
			description: 'Menciona al miembro del q quieres el avatar',
			require: false,
		},
	],
	async execute(client, int, color) {
		let user = int.options.getUser('member') || int.user;
		let member = int.guild.members.cache.get(user.id);
		const nickname = member.nickname || 'No tiene alias';
		const role = member.roles.cache;
		const embed = new EmbedBuilder()
			.setColor(color)
			.setThumbnail(user.avatarURL())
			.setDescription(
				`**Usuario**: ${user.tag}
                **Alias**: ${nickname}
				**ID**: ${user.id}`
			)
			.addFields(
				{
					name: 'Se unio a discord',
					value: `\`${new Date(user.createdTimestamp)
						.toString()
						.split(/ +/)
						.slice(0, -4)
						.toString()
						.replaceAll(',', ' ')}\``,
				},
				{
					name: 'Se unio al server',
					value: `\`${new Date(member.joinedTimestamp)
						.toString()
						.split(/ +/)
						.slice(0, -4)
						.toString()
						.replaceAll(',', ' ')}\``,
				},
				{
					name: 'Roles',
					value: `${role
						.sort((a, b) => b.position - a.position)
						.map((role) => role.toString())
						.slice(0, -1)}`,
				}
			)
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});
		await int.reply({ embeds: [embed] });
	},
};
