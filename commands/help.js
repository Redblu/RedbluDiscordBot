const config = require('../config.json');
const prefix = config.PREFIX;

module.exports = {
	name: "help",
	desc : "Gives you the list of all command and prefix",
	execute: function(message) {
		let helpTxt = "Prefix command is "+prefix+"\nCommand list is\n";

		message.client.commands.forEach((value, key, map)=> {
			helpTxt += value.name + " : " + value.desc + "\n";
		})

		message.author.send(helpTxt);
	}
}