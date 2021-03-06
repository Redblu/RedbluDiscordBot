
module.exports = {
	managePing: function(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Current ping is ${timeTaken}ms.`);
	}
}