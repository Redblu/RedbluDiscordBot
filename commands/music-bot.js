
const ytdl = require('ytdl-core');
const config = require('../config.json');
const voiceChannelId = config.VOICE_CHANNEL;

module.exports = {
	name: "play",
	desc: "Play a youtube music",
	execute: function(message, args) {
		let channel = message.client.channels.cache.get(voiceChannelId);
		if(channel != null){
			channel.join().then(connection => {

				if(args != null){
					const stream = ytdl(args, { filter: 'audioonly' });
					const dispatcher = connection.play(stream);

					dispatcher.on('finish', () => channel.leave());
				}
			})
		}

	},

}