const Command = require ("../structs/Command.js");
const db = require ("../structs/db.js");

module.exports = new Command({
    name: "admcheck",
    alias: [],
    description: "checks if you have an admin permission",
    async run(message, args, client){
        const dbP = await db;
        const row = await dbP.get(`SELECT roles from adminRoles where guild_id = '${message.guildId}'`);
        if (row == null) {return message.channel.send("guild not in database!")}
        if (row.roles === "") {return message.channel.send("no admin roles configured for guild!")}
        const admRoles=JSON.parse(row.roles);
        if (message.member.roles.cache.some(role => admRoles.includes(String(role.id)))) {message.reply("true");}
        else message.reply("false");
    }
});