const {EmbedBuilder} = require('discord.js');
const AnimeList = require('anilist-node');
const Anime = new AnimeList();
module.exports = {
	name: 'anime',
	alias: ['ani'],
	desc: 'Busca una anime en la base de datos de anilist',
	use: '+anime <nombre del anime>',
	async run(client, message, args, color) {
		if (args[0]) {
			const nombreAnime = args.toString().replaceAll(',', ' ');

			try {
				const animeID = await Anime.searchEntry
					.anime(nombreAnime)
					.then(data => data.media[0].id);
				const animeData = await Anime.media
					.anime(animeID)
					.then(data => data);

				let personajes = animeData.characters
					.map(personaje => personaje.name)
					.toString()
					.replaceAll(',', ' | ');
				let estudios = animeData.studios
					.map(estudio => estudio.name)
					.toString()
					.replaceAll(',', ' | ');

				const embed1 = new EmbedBuilder()
					.setColor(animeData.coverImage.color)
					.addFields(
						{name: 'Titulo', value: animeData.title.romaji},
						{
							name: 'Puntuacion',
							value: `${parseFloat(animeData.meanScore) / 10}`,
						},
						{
							name: 'Numero de Episodios',
							value: `${
								animeData.episodes === null
									? 'Aun esta en emision o no se encontro el numero de episodios'
									: animeData.episodes
							}`,
						},
						{
							name: 'Personajes',
							value: personajes,
						},
						{
							name: 'Estudios de animacion',
							value: estudios,
						},
						{
							name: 'Generos',
							value: animeData.genres
								.toString()
								.replaceAll(',', ' | '),
						},
						{
							name: ' ',
							value: animeData.siteUrl,
						}
					)
					.setImage(animeData.bannerImage);

				const embed2 = new EmbedBuilder()
					.setColor(animeData.coverImage.color)
					.setImage(animeData.coverImage.large);

				message.reply({embeds: [embed1, embed2]});
			} catch (error) {
				message.channel.send('❌ | Hubo un error al buscar el anime');
				console.error(error);
			}
		} else {
			message.channel.send('❌ | Debes ingresar el nombre de un anime');
		}
	},
};
