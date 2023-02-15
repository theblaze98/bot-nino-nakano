const { EmbedBuilder } = require( 'discord.js' );
module.exports = {
	name: 'hug',
	alias: [],
	desc: 'Abrazas a un miembro del server',
	use: '+hug <miembro>',
	async run ( client, message, args, color )
	{
		const user = message.mentions.users.first();

		if ( user )
		{
			if ( user != message.author )
			{
				let gif = await fetch('https://api.waifu.pics/sfw/hug').then(r => r.url);


				const embed = new EmbedBuilder()
					.setColor( color )
					.setDescription(
						`${message.author.username} le dio un abrazo a ${user.username}`
					);
				await message.reply( { embeds: [ embed ] } );
			} else
			{
				message.channel.send( `❌ - No puedes mencionarte a ti mismo` );
			}
		} else
		{
			message.channel.send( `❌ - Debes mencionar a alguien` );
		}
	},
};
