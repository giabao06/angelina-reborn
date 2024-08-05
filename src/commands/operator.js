const Command = require("../structs/Command");
const db = require ("../structs/db");

module.exports = new Command({
    name: "operator",
    alias: ["op"],
    description: "Operator info",

    async run(message,args,client){
        const name = args.slice(1).join("");
        const dbP = await db;
        const row = await dbP.get(`SELECT * FROM operators where name = '${name}'`);
        if (row===null) {return message.channel.send("Operator currently not available in database")}
        else message.reply(`**${row.friendlyname}** [${row.rarity} stars]\n
**E2 Lvl90 Stats** (Does not include trust bonus, modules and potentials)
HP **${row.hp}**, Atk **${row.atk}**, Def **${row.def}**, Res **${row.res}**, DP Cost **${row.dp}**, Block **${row.blk}**, Redeployment time: **${row.redpl_time}s**, Atk spd: **${row.aspd}**s
Recommended skill: **${row.rec_skill}**\n\n`+eval('`'+row.desc+'`'));
    }
})