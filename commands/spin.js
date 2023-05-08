const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
//const wheel = require('../testwheel.json');
const Jimp = require('jimp');
const fs = require('fs');
const funcs = require('../wwop-functions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spin')
        .setDescription('Test your luck on the Wacky Wheel of Pain.'),
    async execute(interaction) {
        /*
        const verify = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder()
            .addComponents(verify);
        
        await interaction.deferReply();
        var fileThing = fs.readFileSync('wheel.json');
        var wheel = JSON.parse(fileThing);

        const randChoice = wheel[Math.floor(Math.random() * wheel.length)];

        if(randChoice.name == "Mercy") {
            await interaction.editReply({content: `${interaction.user}. You have received...`, files: ['Mercy.png'], components: [row]});
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
                    await interaction.editReply({content: `${interaction.user}. You have received...`, files: ['newimage.png'], components: [row]});
                }
                
            });
            
        }

        */
       console.log("Using /spin");
       //console.log(interaction);
       funcs.spin(interaction);
    },
};
