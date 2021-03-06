// Base import
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

// Discord.js import
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	if(command instanceof Array){
		for(let subCommand of command){
			client.commands.set(subCommand.name, subCommand);
		}
	}else {
		client.commands.set(command.name, command);
	}
}

// Custom manager import
let scanMessageModule = require('./scan-message.js');
let commandManagerModule = require('./command-manager.js');


////// APP CORE CODE //////

client.login(config.BOT_TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity('Work in progress...');
});

client.on('message', function(message) {

	// Handle textual message
	message = scanMessageModule.scanMessage(message);
	if(message != null){
		commandManagerModule.manageCommand(message);
	}

});


client.on('messageReactionAdd', function(messageReaction, user){
	if(messageReaction.message.id == config.ROLE_MESSAGE){
		messageReaction.client.guilds.fetch(messageReaction.message.channel.guild.id).then((guild)=>{
			guild.members.fetch(user.id).then((member)=>{
				switch (messageReaction.emoji.name) {
				case "🇫🇷":
					member.roles.add("817894714753548340");
				case "🇺🇸":
					member.roles.add("817894757023744051");
				default:
					console.info("Invalid reaction.")
				}
			})
		})
	}
})


client.on('messageReactionRemove', function(messageReaction, user){
	if(messageReaction.message.id == config.ROLE_MESSAGE){
		messageReaction.client.guilds.fetch(messageReaction.message.channel.guild.id).then((guild)=>{
			guild.members.fetch(user.id).then((member)=>{
				switch (messageReaction.emoji.name) {
				case "🇫🇷":
					member.roles.remove("817894714753548340");
				case "🇺🇸":
					member.roles.remove("817894757023744051");
				default:
					console.info("Invalid reaction.")
				}
			})
		})
	}
})