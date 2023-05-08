const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
//const wheel = require('../testwheel.json');
const Jimp = require('jimp');
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Generate your own Punishment!')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Set the name of the new Wheel item.'))
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Set the description of the new Wheel item.')),
    async execute(interaction) {
        await interaction.deferReply();
        
        const fonts = JSON.parse(fs.readFileSync('fonts.json'));
        const punishmentFont = await Jimp.loadFont(fonts.punishmentFont);
        const descriptionFont = await Jimp.loadFont(fonts.descriptionFont);
        const image = await Jimp.read("template.png");

        var line1 = interaction.options.getString('description') ?? "";
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
            text: ("PUNISHMENT: " + interaction.options.getString('name')) || "",
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
            .write("images/custom.png", async function(err) {
                if(!err) {
                    console.log("Successfully made");
                    await interaction.editReply({content: `Currently viewing generated punishment.`, files: ["images/custom.png"]});
                }
            })
        //console.log("Test")
        
    }
};
