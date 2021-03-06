const config = require('./config.json');
const prefix = config.PREFIX;

const commandPingModule = require('./commands/ping.js');

module.exports = {
	manageCommand: function(message) {
		const commandBody = message.content.slice(prefix.length);
		const args = commandBody.split(' ');
		const command = args.shift().toLowerCase();

		if (command === 'ping') {
			commandPingModule.managePing(message);
		}
		else {
			console.log("Unknow command");
			message.reply("What's this command : "+message.content+" ??");
		}
	}
}