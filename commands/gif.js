const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
//const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Replies with the original Wacky Wheel of Pain GIF. (OUTDATED)'),
    async execute(interaction) {
        //await interaction.deferReply();
        await interaction.editReply({content: 'https://cdn.discordapp.com/attachments/1053181192167510026/1054389596764508160/wackywheelremastered.gif'});
    },
};