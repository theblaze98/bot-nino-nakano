const {EmbedBuilder} = require('discord.js');
module.exports = {
	name: 'userinfo',
	alias: ['user', 'infouser'],
	desc: 'Muestra la informacion de un usuario',
	use: '+userinfo [miembro]',
	async run(client, message, args, color) {
		let user = message.mentions.users.first() || message.author;
		let member = message.guild.members.cache.get(user.id);
		const nickname = member.nickname || 'No tiene alias';
		const roles = member.roles.cache;
		const embed = new EmbedBuilder()
			.setColor(color)
			.setThumbnail(user.avatarURL())
			.setDescription(
				`**Usuario**: ${user.tag}
                **Alias**: ${nickname}
				**ID**: ${user.id}
				`
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
					value: `${roles
						.sort((a, b) => b.position - a.position)
						.map(role => role.toString())
						.slice(0, -1)
						.join(' | ')}`,
				}
			)
			.setFooter({
				text: 'Creado por MAKIGAWA',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});

		await message.reply({embeds: [embed]});
	},
};
