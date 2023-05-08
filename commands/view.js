const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const fs = require('fs');
const Jimp = require('jimp');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('View a specific prompt. Numbers found in /list')
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
                .setDescription('The index of the prompt as seen in /list')
		.setRequired(true)),
    async execute(interaction) {
        var fileThing = fs.readFileSync(`${interaction.options.getString('list')}.json`);
        var wheel = JSON.parse(fileThing);

        if(!(interaction.options.getNumber('index') >= 0 && interaction.options.getNumber('index') < wheel.length) || interaction.options.getNumber('index') == null) {
            console.log("Not in range");
            await interaction.reply({content:"That index is not valid!", ephemeral: true});
            return;
        }
        await interaction.deferReply();
        const randChoice = wheel[Math.floor(interaction.options.getNumber('index'))];

        if(randChoice.name == "Mercy") {
            await interaction.editReply({content: `Currently viewing punishment ${Math.floor(interaction.options.getNumber('index'))} from the ${interaction.options.getString('list')} list.`, files: ['Mercy.png']});
        } else {
            const punishmentFont = await Jimp.loadFont("zYVUHLRPOHvMWU_3evbdVn5r.ttf.fnt");
            const descriptionFont = await Jimp.loadFont("W_vwIJpxZy0dfHpXtd1MO1zO.ttf.fnt");
    
            const image = await Jimp.read("template.png");
            var line1 = randChoice.description ?? "";
            var line2 = "";

            if (line1.length > 60) {
                // Find the nearest space character to the middle of the string
                const middleIndex = Math.ceil(line1.length / 2);
                let spaceIndex = line1.lastIndexOf(' ', middleIndex);
                if (spaceIndex === -1) {
                  spaceIndex = line1.indexOf(' ', middleIndex);
                }
                if (spaceIndex !== -1) {
                  // Split the string at the space character
                  line2 = line1.substr(spaceIndex + 1);
                  line1 = line1.substr(0, spaceIndex);
                }
            }
            image.print(punishmentFont, 0, 685, {
                text: "PUNISHMENT: " + randChoice.name,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            }, 1920, 1080)
                .print(descriptionFont, 0, 870, {
                text: line1,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            }, 1920, 1080)
                .print(descriptionFont, 0, 920, {
                text: line2,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
            }, 1920, 1080)
            .write("newimage.png", async function (err) {
                if(!err) {
                    await interaction.editReply({content: `Currently viewing punishment ${Math.floor(interaction.options.getNumber('index'))} from the ${interaction.options.getString('list')} list.`, files: ['newimage.png']});
                }
                
            });
            
        }
        
    },
};
