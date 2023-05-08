const { SlashCommandBuilder, AttachmentBuilder, Message, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const Jimp = require('jimp');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('(ADMIN ONLY) Delete a specific prompt. Numbers found in /list')
        .addStringOption(option =>
            option
                .setName('list')
                .setDescription('Choose between the active wheel and the suggestions.')
                .setRequired(true)
                .addChoices(
                    { name: 'Wheel', value: 'wheel'},
                    { name: 'Suggestions', value: 'suggestions'}
                ))

	.addNumberOption(option => 
            option
                .setName('index')
                .setDescription('The index of the prompt as seen in /list')),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true});
        var fileThing = fs.readFileSync(`${interaction.options.getString('list')}.json`);
        var wheel = JSON.parse(fileThing);
        if(!(interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator))) {
            console.log("PERSON IS NOT AN ADMIN");
            await interaction.editReply({content:"You do not have permission to do this command!", ephemeral: true, });
            return;
        }
        if(!(interaction.options.getNumber('index') >= 0 && interaction.options.getNumber('index') < wheel.length) || interaction.options.getNumber('index') == null) {
            console.log("Not in range");
            await interaction.editReply({content:"That index is not valid!", ephemeral: true, });
            return;
        }
        
        const choice = Math.floor(interaction.options.getNumber('index'));
        //console.log("Choice is "+ choice);
        wheel.splice(choice, 1);

        fs.writeFile(`${interaction.options.getString('list')}.json`, JSON.stringify(wheel, null, 4), async err => {
            if(err) throw err;
            await interaction.editReply({content:"Item deleted.", ephemeral: true, })
            console.log("Item deleted.");
        });

        
            
        
    },
};
