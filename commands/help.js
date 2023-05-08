const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all available commands'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true});
	let str = ``;
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
        const command = require(`./${file}`);
        str += `Name: \`\`${command.data.name}\`\`, Description: \`\`${command.data.description}\`\` \n`;
        console.log(str);
	}
        
	await interaction.editReply({content: str, ephemeral: true,});
    },
};
