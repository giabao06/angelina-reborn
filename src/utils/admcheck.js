const db = require ("../structs/db.js");
const Discord = require ("discord.js");

/**
 * @param {Discord.Message | Discord.Interaction} message
 */
module.exports = async function isAdmin(message){
    const dbP = await db;
    const row = await dbP.get(`SELECT roles from adminRoles where guild_id = '${message.guildId}'`);
    const admRoles=JSON.parse(row.roles);
    if (row.roles == "") {return false;}
    if (message.member.roles.cache.some(role => admRoles.includes(String(role.id)))) {return true;}
    else return false;
}

