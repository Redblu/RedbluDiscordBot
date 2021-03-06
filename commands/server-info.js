
module.exports = {
	name: "server-info",
	desc: "Display basic server info",
	execute: function(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}
}