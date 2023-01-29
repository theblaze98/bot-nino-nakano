const { EmbedBuilder } = require( 'discord.js' );
const NekosApi = require( 'nekos.life' );
const neko = new NekosApi();
const config = require( '../../config.json' );
module.exports = {
    name: 'kiss',
    alias: [],
    desc: 'Le das un beso a un miembro del server',
    use: '+kiss <miembro>',
    async run ( client, message, args, color )
    {
        const user = message.mentions.users.first();

        if ( user )
        {
            if ( user != message.author )
            {
                if ( user.id === client.user.id && message.author.id === config.authorID )
                {
                    const embed = new EmbedBuilder()
                        .setColor( color )
                        .setDescription(
                            `${message.author.username} me gusta como me besas`
                        )
                        .setImage( ( await neko.kiss() ).url );
                    await message.reply( { embeds: [ embed ] } );

                } else if ( user.id === client.user.id )
                {
                    message.channel.send( `❌ - Lo siento pero debes mencionar a alguien mas` );
                } else
                {
                    const embed = new EmbedBuilder()
                        .setColor( color )
                        .setDescription(
                            `${message.author.username} le dio un beso a ${user.username}`
                        )
                        .setImage( ( await neko.kiss() ).url );
                    await message.reply( { embeds: [ embed ] } );
                }
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
