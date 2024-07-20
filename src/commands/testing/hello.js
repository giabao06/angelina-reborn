const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('hello... world? or planet? who knows'),
    async execute(interaction){
        await interaction.reply("Hello! This is `angelina-reborn`! If you're reading this, he got this command to work." );
    },
};