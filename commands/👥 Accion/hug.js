const { EmbedBuilder } = require( 'discord.js' );
const NekosApi = require( 'nekos.life' );
const neko = new NekosApi();
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
				const embed = new EmbedBuilder()
					.setColor( color )
					.setDescription(
						`${message.author.username} le dio un abrazo a ${user.username}`
					)
					.setImage( ( await neko.hug() ).url );
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
