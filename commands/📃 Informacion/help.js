const { EmbedBuilder } = require('discord.js');
const { readdirSync } = require('fs');
module.exports = {
	name: 'help',
	alias: ['h'],
	desc: 'Muestra el menu de ayuda del bot',
	use: '+help [nombre de la categoria o comando]',
	async run(client, message, args, color) {
		const categorias = readdirSync('./commands');
		const embed = new EmbedBuilder()
			.setColor(color)
			.setDescription(
				`Estas son las categorias de mis comandos
			\n>>> ${categorias.map((categoria) => `\`${categoria}\``).join(' - ')}
			\nUsa \`+help nombre_categoria\` para ver los comandos de cada categoria`
			)
			.setFooter({
				text: '<obligatorio>[opcional]',
				iconURL:
					'https://w0.peakpx.com/wallpaper/209/412/HD-wallpaper-anime-the-quintessential-quintuplets-nino-nakano.jpg',
			});
		if (args[0]) {
			const comando =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.find(
					(c) => c.alias && c.alias.includes(args[0].toLowerCase())
				);
			const categoria = categorias.find((categoria) =>
				categoria.toLowerCase().endsWith(args[0].toLowerCase())
			);
			if (comando) {
				embed
					.setTitle(`Comando ${comando.name}`)
					.setDescription(' ')
					.addFields(
						{
							name: 'Descripcion',
							value: `\`\`\`${comando.desc}\`\`\``,
						},
						{ name: 'Como usar', value: `\`${comando.use}\`` }
					);
				if (comando.alias && comando.alias.length >= 1) {
					embed.addFields({
						name: 'alias',
						value: `${comando.alias
							.map((alias) => `\`${alias}\``)
							.join(', ')}`,
					});
				}
			} else if (categoria) {
				const commandsCategoria = readdirSync(
					`./commands/${categoria}`
				).filter((file) => file.endsWith('.js'));
				embed.setTitle(`Categoria ${categoria}`);
				if (commandsCategoria.length >= 1) {
					embed.setDescription(
						`>>> ${commandsCategoria
							.map(
								(comando) =>
									`\`${comando.replaceAll('.js', '')}\``
							)
							.join(' - ')}
						\nUsa \`+help nombre_comando\` para obtener mas informacion sobre el comando`
					);
				}
			} else {
				embed.setDescription(
					`❌**No se ha encontrado el comando o categoria especificado**❌ \nUsa \`+help\` para ver la comandos y categorias`
				);
			}
		}

		message.reply({ embeds: [embed] });
	},
};
