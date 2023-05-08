const { Client, SlashCommandBuilder, AttachmentBuilder, Message, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('points')
        .setDescription('Check your points!'),
    async execute(interaction) {
        //console.log(interaction.client);
        //const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
        //await interaction.deferReply({ ephemeral: true});
        var data = fs.readFileSync(`users.json`);
        var users = JSON.parse(data);
        users.sort((a, b) => b.points - a.points);
        const found = users.findIndex( (user) => user.id == interaction.user.id)
        var text;
        if(found != -1) {
            text = `You currently have ${users[found].points} point(s). You are #${found+1} on the leaderboard.`;
        } else {
            text = `You currently have 0 point(s). You are #${users.length + 1} on the leaderboard.`
        }
        
        await interaction.reply({content: text, ephemeral: false, });
    },
};
