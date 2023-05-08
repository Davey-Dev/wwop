const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Lists all of the Wheel Items')
	.addStringOption(option =>
            option
                .setName('list')
                .setDescription('Choose between viewing the active wheel and the suggestions.')
		.setRequired(true)
                .addChoices(
                    { name: 'Wheel', value: 'wheel'},
                    { name: 'Suggestions', value: 'suggestions'}
                )),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true});
        var wheel = fs.readFileSync(`${interaction.options.getString('list')}.json`);
        var obj = JSON.parse(wheel);
        var text = `${interaction.options.getString('list')[0].toUpperCase() + interaction.options.getString('list').slice(1)} List\n`;
        for(var i = 0; i < obj.length; i++) {
            text += `[${i}] - ${obj[i].name}\n`
        }
        await interaction.editReply({content: text.substr(0,2000), ephemeral: true, });
    },
};
