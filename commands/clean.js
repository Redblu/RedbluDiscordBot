
const config = require('../config.json');

module.exports = {
	name: "clean",
	desc: "Clear all bot and user command messages",
	execute: function(message, args) {
		if (message.member.hasPermission("MANAGE_MESSAGES")) {
			message.channel.messages.fetch()
				.then(function(list){
					let msgToDelete = [];
					if(args == "--force"){
						// TODO : Limiter l'accès à cette fonction
						msgToDelete = list;
					}
					else{
						list.forEach((value, key, map) => {
							if(value.author.id == message.client.user.id){
								msgToDelete.push(list.get(key));
							}
							else if(value.content.charAt(0) == config.PREFIX){
								msgToDelete.push(list.get(key));
							}
						})
					}
					message.channel.bulkDelete(msgToDelete, true);
					if(msgToDelete.length > 0){
						// La fonction ne peut delete que 50 messages à la fois
						// La relancer si on a supprimer des messages
						// Si on a rien supprimé, sert à rien de relancer, c'est qu'on a déjà tout clean
						this.execute(message);
					}
				}.bind(this),
				function(err){
					message.channel.send("ERROR: ERROR CLEARING CHANNEL.")
				})
		}
	}
}