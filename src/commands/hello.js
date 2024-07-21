const Command = require ("../structs/Command.js");

module.exports = new Command({
    name: "hello",
    alias: [],
    description: "hello... world? or planet? who knows",

    async run(message,args,client){
        message.channel.send("hello! if you see this, the prefix ver. of `angelina-reborn` is working!");
    }
})
