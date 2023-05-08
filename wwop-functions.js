const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
//const wheel = require('../testwheel.json');
const Jimp = require('jimp');
const fs = require('fs');

async function genImages(num) {
    const wheel = JSON.parse(fs.readFileSync('wheel.json'));
    const fonts = JSON.parse(fs.readFileSync('fonts.json'));
    const punishmentFont = await Jimp.loadFont(fonts.punishmentFont);
    const descriptionFont = await Jimp.loadFont(fonts.descriptionFont);
    var files = [];
    var randChoice;
    for(let i = 0; i < num; i++) {
        const image = await Jimp.read("template.png");
        randChoice = wheel[Math.floor(Math.random() * wheel.length)];
        
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
        await new Promise((resolve, reject) => {
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
        .write(`images/${randChoice.name}.png`, async function (err) {
                if(!err) {
                    console.log("Writing image");
                    files.push(`images/${randChoice.name}.png`);
                    resolve();
                } else {
                    reject(err);
                }
                
            });  
        });
          
    } 
    return files;
}

async function spin(interaction) {
        const verify = new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Primary)
        const skip = new ButtonBuilder()
            .setCustomId('skip')
            .setLabel('Skip')
            .setStyle(ButtonStyle.Primary)
        const bogoverify = new ButtonBuilder()
            .setCustomId('bogoverify')
            .setLabel('Verify')
            .setStyle(ButtonStyle.Primary)
        const spinagain = new ButtonBuilder()
            .setCustomId('spin')
            .setLabel('Spin')
            .setStyle(ButtonStyle.Primary)

        await interaction.deferReply();

        var newmessage = `${interaction.user}. `;
        const rngmod = Math.floor(Math.random() * 150);
        //const rngmod = 1;

        if (rngmod == 0) {
            console.log("Mercy");
            newmessage = newmessage + `You have been spared.`;
            const row = new ActionRowBuilder()
            .addComponents(spinagain);
            await interaction.editReply({content: newmessage, files: ['Mercy.png'], components: [row]});
        } else if (rngmod == 1) {
            console.log("Buy One Get One Free");
            newmessage = newmessage + `Buy One Get One Free - Do TWO Punishments! You have received...`;
            const row = new ActionRowBuilder()
            .addComponents(spinagain, bogoverify, skip);

            genImages(2)
                .then((files) => {
                    interaction.editReply({content: newmessage, files: files, components: [row]});
                });

        } else if (rngmod == 2) {
            console.log("Haha");
            newmessage = newmessage + `Haha - Multiply this punishment by 5! You have received...`;
            const row = new ActionRowBuilder()
            .addComponents(spinagain, verify, skip);

            genImages(1)
                .then((files) => {
                    interaction.editReply({content: newmessage, files: files, components: [row]});
                });

        } else {
            console.log("Regular");
            newmessage = newmessage + `You have received...`;
            const row = new ActionRowBuilder()
            .addComponents(spinagain, verify, skip);

            genImages(1)
                .then((files) => {
                    interaction.editReply({content: newmessage, files: files, components: [row]});
                });
        }
}

async function lol(interaction) {
	 const lolButton = new ButtonBuilder()
            .setCustomId('lol')
            .setStyle(ButtonStyle.Secondary)
	    .setEmoji('1000051962336772218');

	const row = new ActionRowBuilder()
		.addComponents( lolButton )

	await interaction.reply({content: '<:hp_miyalolto:1000051962336772218>', components: [row] });

}



module.exports = { spin, lol };
