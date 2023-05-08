const { Client, SlashCommandBuilder, AttachmentBuilder, Message, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('View the leaderboard'),
    async execute(interaction) {
        //console.log(interaction.client);
        //const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
        //await interaction.deferReply({ ephemeral: true});
        var data = fs.readFileSync(`users.json`);
        var users = JSON.parse(data);
        users.sort((a, b) => b.points - a.points);
        var text = "Current Points Leaderboard: \n";
        for (let i = 0; i < 10; i++) {
            //console.log(`current i: ${i}. current array length: ${users.length}`);
            if( i == users.length) { break; }
            var member = await interaction.client.users.fetch(users[i].id);
            //console.log(member);
            text = text + `\n#${i+1}: ${member.username} - ${users[i].points} point`;
            if(users[i].points != 1) text = text + "s";
        }
        await interaction.reply({content: text, ephemeral: false, });
    },
};
