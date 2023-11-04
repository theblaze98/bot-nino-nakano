const { fetch } = require('undici');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'kill',
    alias: [],
    desc: 'Asesinas a alguien',
    use: '+kill <miembro>',
    async run(client, message, args, color) {
        const user = message.mentions.users.first();
        if (user) {
			if (user != message.author) {
				let gif = await fetch('https://api.waifu.pics/sfw/kill')
					.then(r => r.json())
					.then(data => data.url);

				const embed = new EmbedBuilder()
					.setColor(color)
					.setDescription(
						`${message.author.username} Asesino a ${user.username}`
					)
					.setImage(gif);
				await message.reply({embeds: [embed]});
			} else {
				await message.reply(
					'Te quieres suicidar <:_:962080616176832522>'
				);
			}
		} else {
			message.channel.send(`❌ - Debes mencionar a alguien`);
		}
    }
}
