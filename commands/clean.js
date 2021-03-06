
module.exports = {
	name: "clean",
	desc: "Clear all bot and user command messages",
	execute: function(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Current ping is ${timeTaken}ms.`);
	}
}