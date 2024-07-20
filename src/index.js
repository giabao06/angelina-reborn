const { Client, Events, GatewayIntentBits, Collection } = require ('discord.js');
const { token, prefix } = require ('../data/config.json');


const fs = require('node:fs');
const path = require('node:path');


const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

const cmdDir = path.join(__dirname, 'commands');
const cmdFolders= fs.readdirSync(cmdDir);

for (const folder of cmdFolders){
    const cmdPath = path.join(cmdDir, folder);
    const cmdFiles = fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'));
    for (const file of cmdFiles) {
        const fPath = path.join(cmdPath, file);
        const cmd = require (fPath);
        if ('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
            console.log(`loaded command ${cmd.data.name}`);
        } else {
            console.log (`${fPath} is incomplete, maybe. fix it ya dummy`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const cmd=interaction.client.commands.get(interaction.commandName);
    
    if (!cmd) {
        console.error(`${interaction.commandName} isnt here yet`);
        return;
    }

    try {
        await cmd.execute(interaction);
    }
    catch (error){
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'a bad happend :(', ephemeral: true});
        } else {
            await interaction.reply({content: 'a bad happend :(', ephemeral: true});
        }
    }
    console.log(`${interaction.user.globalName} (@${interaction.user.username}) used ${interaction.commandName}`);
});

client.once(Events.ClientReady, readyClient => {
    client.user.setPresence({ activities: [{ name: 'in a sandbox (?%)' }], status: 'idle' });
    console.log(`logon success, user=${readyClient.user.tag}`);
});

client.login(token);
