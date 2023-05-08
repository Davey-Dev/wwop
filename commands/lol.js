const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
//const fs = require('fs');
//const path = require('path');
const funcs = require('../wwop-functions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lol')
        .setDescription('lol?'),
    async execute(interaction) {
	    funcs.lol(interaction);
        //await interaction.reply({content: '<:hp_miyalolto:1000051962336772218>'});
    },
};
