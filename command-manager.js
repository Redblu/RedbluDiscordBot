const config = require('./config.json');
const prefix = config.PREFIX;

module.exports = {
	manageCommand: function(message) {
		const commandBody = message.content.slice(prefix.length);
		const args = commandBody.split(' ');
		const command = args.shift().toLowerCase();

		try {
			message.client.commands.get(command).execute(message, args);
		} catch (error) {
			console.error("ERROR -- What's this command : "+message.content+" ??");
			console.error(error);
		}

	}
}