const { Client, Events, GatewayIntentBits, Collection } = require ('discord.js');
const { token, prefix } = require ('../data/config.json');
const Command = require("./structs/Command.js");

class Client_ext extends Client{
    constructor(options){
        super({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] })

        /**
         * @type {Discord.Collection<string, Command>}
         */
        this.commands =  new Collection();
    }
}

const client = new Client_ext();

const fs = require('node:fs');
const path = require('node:path');

fs.readdirSync('./commands')
    .filter(file => file.endsWith(".js"))
    .forEach(file => {
        /**
		 * @type {Command}
		 */
        const cmd = require(`./commands/${file}`);
        client.commands.set(cmd.name,cmd);
        console.log(`loaded command ${cmd.name}`);
    });

client.on("messageCreate", message =>{
    if (message.author.bot) return;
    if(message.content.slice(0, prefix.length).toLowerCase() !== prefix) return;
    const args = message.content.substring(prefix.length).split(/ +/);
    var command = client.commands.find(cmd => cmd.name == args[0]);
    if (!command) var command =  client.commands.find(cmd => cmd.alias == args[0]);
    if (!command) return message.reply(`invalid command: ${args[0]}`);
    command.run(message,args,client);
})

client.once(Events.ClientReady, readyClient => {
    client.user.setPresence({ activities: [{ name: 'in a sandbox (?%, prefix ver.)' }], status: 'idle' });
    console.log(`logon success, user=${readyClient.user.tag}`);
});

client.login(token);
