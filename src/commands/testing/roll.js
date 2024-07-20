const { SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('rng; you choose the max. (default max = 100, floor)')
        .addStringOption(option =>
            option.setName('max')
                .setDescription('maximum number to rng (int >=1, default 100)')
        )
        .addBooleanOption(option => 
            option.setName("restype") 
                .setDescription('ya like decimal numbers (answer true) or integers (falsee)? <(") (default false)')
        ),

    async execute(interaction){
        const tmp = interaction.options.getString('max');
        if (Number(tmp)<1 && tmp != null) {await interaction.reply("invalid max, please check your input");}
        else {
            if (tmp==null) {var max = 100;}
            else var max = Number(tmp);
            var res = (Math.random()*max)+1;
            var restype = interaction.options.getString(restype);
            if ( restype == null || restype == "False") {res = Math.floor(res);}
            await interaction.reply(String(res));
        }
    },
};