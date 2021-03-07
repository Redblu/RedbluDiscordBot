
const ytdl = require('ytdl-core');
const config = require('../config.json');
const voiceChannelId = config.VOICE_CHANNEL_MUSIC;
const textChannelId = config.TEXT_CHANNEL_MUSIC;

const queue = new Map();

module.exports = [
	{
		name: "play",
		desc: "Play a youtube music",
		execute: async function(message, args) {
			const serverQueue = queue.get(message.guild.id);
			const voiceChannel = message.member.voice.channel;
			if(message.channel.id != textChannelId){
				return;
			}
			if (!voiceChannel)
				return message.channel.send(
					"You need to be in a voice channel to play music!"
				);
			if(voiceChannel.id != voiceChannelId){
				return message.channel.send(
					"I cannot play music in this channel"
				);
			}
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
				return message.channel.send(
					"I need the permissions to join and speak in your voice channel!"
				);
			}

			const songInfo = await extractYoutubeInfo(args);

			const song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
			};

			if (!serverQueue) {
				const queueContruct = {
					textChannel: message.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true
				};

				queue.set(message.guild.id, queueContruct);

				// TODO : Ne pas remettre une musique déjà dans la queue
				if(true){
					queueContruct.songs.push(song);
				}else {

				}

				try {
					let connection = await voiceChannel.join();
					queueContruct.connection = connection;
					play(message.guild, queueContruct.songs[0]);
				} catch (err) {
					console.log(err);
					queue.delete(message.guild.id);
					return message.channel.send(err);
				}
			}
			else {
				serverQueue.songs.push(song);
				return message.channel.send(`${song.title} has been added to the queue!`);
			}
		}
	},
	{
		name: "skip",
		desc : "Skip the current playing song",
		execute: function(message) {
			const serverQueue = queue.get(message.guild.id);
			skip(message, serverQueue);
		}
	},
	{
		name: "stop",
		desc : "Stop the current playing song",
		execute: function(message) {
			const serverQueue = queue.get(message.guild.id);
			stop(message, serverQueue);
		}
	},
	{
		name: "queue",
		desc : "Display the song queue info",
		execute: function(message) {
			const serverQueue = queue.get(message.guild.id);
			displayQueue(message, serverQueue);
		}
	}
];

function skip(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send(
			"You have to be in a voice channel to stop the music!"
		);
	if (!serverQueue)
		return message.channel.send("There is no song that I could skip!");
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voice.channel)
		return message.channel.send(
			"You have to be in a voice channel to stop the music!"
		);

	if (!serverQueue)
		return message.channel.send("There is no song that I could stop!");

	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection
		.play(ytdl(song.url))
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

function displayQueue(message, serverQueue) {
	if (!serverQueue) {
		return message.channel.send("There is no song in the queue !\nType '!play youtube_url' to play a song.");
	}

	let msg = "**Current queue :**\n";
	let cpt = 1;
	for(let song of serverQueue.songs){
		msg += "**"+cpt+".**"+song.title+ " \n";
		cpt++;
	}
	return message.channel.send(msg);
}

function extractYoutubeInfo(url){
	// TODO : Handling url invalid
	let ytInfos = ytdl.getInfo(url);

	if(ytInfos == null){
		return message.channel.send(
			"No music found for : "+args
		);
	}
	return ytInfos;
}