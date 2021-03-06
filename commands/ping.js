
module.exports = {
	name: "ping",
	desc: "Give current bot latency",
	execute: function(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Current ping is ${timeTaken}ms.`);
	}
}