
const config = require('../config.json');

module.exports = {
	name: "clean",
	desc: "Clear all bot and user command messages",
	execute: function(message, args) {
		if (message.member.hasPermission("MANAGE_MESSAGES")) {
			message.channel.messages.fetch()
				.then(function(list){
					let msgToDelete = [];

					if(args != null && args.length >0 && config.ADMINS.includes(message.author.id)){
						if(args.length === 1 && args[0] === "--force"){
							msgToDelete = list;
						}
						else if (args.length === 2 && args[0] === "--force" && !isNaN(Number(args[1]))){
							let numberToDelete = Number(args[1])+1;
							let cpt = 0;
							list.forEach((value, key, map) => {
								if(cpt < numberToDelete){
									msgToDelete.push(list.get(key));
								}
								cpt ++;
							});

							if(numberToDelete > 50){
								args[1] = numberToDelete - 50; // Will recall this function to delete the others 50+ msg
							}
						}
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

					if((msgToDelete.length > 0 && args == null) || (args != null && args.length > 1 && Number(args[1]) > 0)){
						// La fonction ne peut delete que 50 messages à la fois
						// La relancer si on a supprimer des messages
						// Si on a rien supprimé, sert à rien de relancer, c'est qu'on a déjà tout clean
						this.execute(message, args);
					}
				}.bind(this),
				function(err){
					message.channel.send("ERROR: ERROR CLEARING CHANNEL.")
				})
		}
	}
}