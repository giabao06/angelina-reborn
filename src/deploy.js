const { REST, Routes } = require('discord.js');
const { clientID,  token } = require('../data/config.json');

const fs = require('node:fs');
const path = require('node:path');

const guildID = "";
const commands = [];

const cmdDir = path.join(__dirname, 'commands');
const cmdFolders= fs.readdirSync(cmdDir);

for (const folder of cmdFolders){
    const cmdPath = path.join(cmdDir, folder);
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
    for (const file of cmdFiles) {
        const fPath = path.join(cmdPath, file);
        const cmd = require (fPath);
        if ('data' in cmd && 'execute' in cmd) {
            commands.push(cmd.data.toJSON());
            console.log(`json conversion done for command ${cmd.data.name}`);
        } else {
            console.log (`${fPath} is incomplete, maybe. fix it ya dummy`);
        }
    }
}

const rest = new REST().setToken(token);

( async () => {
    try{
        console.log(`begin registering ${commands.length} cmds`);
        const data=await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        );
        console.log (`registered ${data.length} cmds`);
    }
    catch(error){
        console.log("a bad happend");
        console.error(error);
    }
})();