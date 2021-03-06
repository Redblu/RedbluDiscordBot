const config = require('./config.json');
const prefix = config.PREFIX;

module.exports = {
    scanMessage: function(message){
        console.log("scanning message : ", message.content);

        if (message.author.bot) {
            console.log('Other BOT message -- Ignore');
            return null;
        }
        if (!message.content.startsWith(prefix)) {
            console.log('No prefix -- Ignore');
            return null;
        }

        return message;
    }
};