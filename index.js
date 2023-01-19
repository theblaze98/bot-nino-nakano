const {
	Client,
	GatewayIntentBits,
	Partials,
	Collection,
} = require('discord.js');

const client = new Client({
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
		parse: ['users', 'roles'],
	},
});
require('colors');
const { readdirSync } = require('fs');
const config = require('./config.json');

client.on('ready', () => {
	console.log(`El bot ${client.user.tag} esta activo`.green);
});

client.login(config.token);
