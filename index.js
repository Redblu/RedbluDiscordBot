const Discord = require('discord.js');
const config = require('./config.json');

let scanMessageModule = require('./scan-message.js');
let commandManagerModule = require('./command-manager.js');

const client = new Discord.Client();
const prefix = config.PREFIX;
client.login(config.BOT_TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', function(message) {

	message = scanMessageModule.scanMessage(message);
	if(message != null){
		commandManagerModule.manageCommand(message);
	}

});