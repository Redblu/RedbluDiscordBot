// Base import
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

// Discord.js import
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
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

	message = scanMessageModule.scanMessage(message);
	if(message != null){
		commandManagerModule.manageCommand(message);
	}

});