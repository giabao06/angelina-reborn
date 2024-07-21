const Command = require ("../structs/Command.js");
const db = require ("../structs/db.js");

module.exports = new Command({
    name: "admcheck",
    alias: [],
    description: "checks if you have an admin permission",
    async run(message, args, client){
        var uid=args.slice(1).join(" ");
        uid = uid.replace('<', ''); 
        uid = uid.replace('>', '');
        uid = uid.replace('@', '');
    db.get(`SELECT roles from adminRoles where guild_id = '${message.guildId}'`, (err,row) => {
        if (err) {
            return message.channel.send(`database error\n${err}`);
        }
        else {
            const admRoles=JSON.parse(row.roles); console.log(admRoles);
            if (admRoles==null) {return message.channel.send("no admin roles configured for guild!")}
            if (message.member.roles.cache.some(role => admRoles.includes(String(role.id)))) {message.reply("true");}
            else message.reply("false");
        }
    });
    }
})