const config = require('../config.json');
const Discord = require('discord.js');
const prefix = config.PREFIX;

module.exports = {
	name: "help",
	desc : "Gives you the list of all command and prefix",
	execute: function(message) {
		let description = "Prefix command is "+prefix;

		const exampleEmbed = {
			color: 0x0099ff,
			title: 'SuperRedBot',
			description: description,
			url: 'https://github.com/Redblu',
			fields: craftContent(message),
			timestamp: new Date(),
			footer: {
				text: 'Redblu.',
				icon_url: 'https://i.imgur.com/wSTFkRM.png',
			},
		};

		message.author.send({ embed: exampleEmbed });
	}
}

function craftContent(message){
	let fields = [
		{
			name: 'Current bot status',
			value: 'Still in development ',
		},
		{
			name: '\u200b',
			value: '\u200b',
			inline: false,
		}
	]
	message.client.commands.forEach((value, key, map)=> {
		fields.push({name: value.name, value: value.desc});
	});

	return fields;
}