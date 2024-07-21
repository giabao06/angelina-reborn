const Command = require ("../structs/Command.js");
const admcheck = require ("../utils/admcheck.js");

module.exports = new Command({
    name: "shutdown",
    alias: [],
    description: "shuts down the bot",

    async run(message,args,client){
        var res = await admcheck(message);
        if (!res) {return message.reply("sorry ya don't have admin permissions")}
        else {
            message.reply("sending sigterm").then(() => {
                console.log(`${message.author.globalName} (@${message.author.username}) requested shutdown, going down...`);
                client.destroy();
            })
        }
    }
})