require('dotenv').config();
const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection,
	ActivityType,
	PresenceUpdateStatus,
} = require( 'discord.js' );

const client = new Client( {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [
		Partials.GuildMember,
		Partials.User,
		Partials.Message,
		Partials.Channel,
	],
	allowedMentions: {
		repliedUser: false,
		parse: [ 'users', 'roles' ],
	},
	presence: {
		activities: [
			{ name: 'a mi hermoso creador', type: ActivityType.Watching },
		],
		status: PresenceUpdateStatus.Online,
	},
} );
require( 'colors' );
const { readdirSync } = require( 'fs' );
const config = require( './config.json' );

client.commands = new Collection();
client.slashcommands = new Collection();

client.on( 'ready', () =>
{
	console.log( `El bot ${client.user.tag} esta activo`.green );

	client.application.commands.set( client.slashcommands.map( ( x ) => x ) );
} );

client.on( 'messageCreate', ( message ) =>
{
	if (
		message.author === 'bot' ||
		!message.guild ||
		message.channel.type === 'dm'
	)
		return;

	if ( !message.content.startsWith( config.prefix ) ) return;

	let args = message.content.slice( config.prefix.length ).trim().split( / +/ );
	let command = args.shift().toLowerCase();

	let cmd = client.commands.find(
		( c ) => c.name === command || c.alias.includes( command )
	);

	if ( cmd ) cmd.run( client, message, args, color() );
} );

client.on( 'interactionCreate', ( int ) =>
{
	const cmd = client.slashcommands.get( int.commandName );
	if ( !cmd ) return;
	cmd.execute( client, int, color() );
} );

client.login( process.env.TOKEN_BOT );

/* ------------------------ */
/* Prefix Command Handler */
/* ------------------------ */

console.log( `Prefix Commands`.red );
readdirSync( './commands' ).forEach( ( dir ) =>
{
	const commands = readdirSync( `./commands/${dir}/` ).filter( ( file ) =>
		file.endsWith( '.js' )
	);
	for ( const file of commands )
	{
		const command = require( `./commands/${dir}/${file}` );
		console.log( `✅ - Comando ${file.replace( '.js', '' )} cargado`.cyan );
		client.commands.set( command.name, command );
	}
} );

/* ------------------------ */
/* Slash Command Handler */
/* ------------------------ */

console.log( `Slash Commands`.red );

readdirSync( './slashcommands' ).forEach( ( dir ) =>
{
	const slashcommands = readdirSync( `./slashcommands/${dir}` ).filter( ( file ) =>
		file.endsWith( '.js' )
	);
	for ( const file of slashcommands )
	{
		const slashcommand = require( `./slashcommands/${dir}/${file}` );
		console.log( `✅ - Comando ${file.replace( '.js', '' )} cargado`.cyan );
		client.slashcommands.set( slashcommand.name, slashcommand );
	}
} );

function color ()
{
	const valores = '0123456789ABCDEF';
	let color = '#';
	for ( let i = 0; i < 6; i++ )
	{
		color += valores[ Math.floor( Math.random() * 16 ) ];
	}
	return color;
}
