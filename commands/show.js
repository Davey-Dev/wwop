const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const fs = require('fs');
const Jimp = require('jimp');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Show a specific prompt. Numbers found in /list')
        .addNumberOption(option => 
            option
                .setName('index')
                .setDescription('The index of the prompt as seen in /list')),
    async execute(interaction) {
        await interaction.deferReply();
        var fileThing = fs.readFileSync('wheel.json');
        var wheel = JSON.parse(fileThing);

        if(!(interaction.options.getNumber('index') >= 0 && interaction.options.getNumber('index') < wheel.length) || interaction.options.getNumber('index') == null) {
            console.log("Not in range");
            await interaction.editReply("That index is not valid!");
            return;
        }
        const randChoice = wheel[interaction.options.getNumber('index')];

        if(randChoice.name == "Mercy") {
            await interaction.editReply({content: `${interaction.user}. You have received...`, files: ['Mercy.png']});
        } else {
            const fonts = JSON.parse(fs.readFileSync('fonts.json'));
            const punishmentFont = await Jimp.loadFont(fonts.punishmentFont);
            const descriptionFont = await Jimp.loadFont(fonts.descriptionFont);
    
            const image = await Jimp.read("template.png");

            var line1 = randChoice.description ?? "";
            var line2 = "";

            if (line1.length > 60) {
                const middleIndex = Math.ceil(line1.length / 2);
                let spaceIndex = line1.lastIndexOf(' ', middleIndex);
                if (spaceIndex === -1) {
                  spaceIndex = line1.indexOf(' ', middleIndex);
                }
                if (spaceIndex !== -1) {
                  line2 = line1.substr(spaceIndex + 1);
                  line1 = line1.substr(0, spaceIndex);
                }
            }
            image.print(punishmentFont, 0, 685, {
                text: randChoice.name,
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
            .write(`images/${randChoice.name}.png`, async function (err) {
                if(!err) {
                    await interaction.editReply({content: `${interaction.user}. You have received...`, files: [`images/${randChoice.name}.png`]});
                }
                
            });
            
        }
        
    },
};