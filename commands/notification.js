const { Client, SlashCommandBuilder, AttachmentBuilder, Message, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notification')
        .setDescription('Set whether to send DM notifications or not')
        .addStringOption(option => 
            option.setName('toggle')
                .setDescription('Toggle option')
                .setRequired(true)
                .addChoices(
                    { name: 'Enable', value: 'enable' },
                    { name: 'Disable', value: 'disable'}
                )),
    async execute(interaction) {
        const toggle = interaction.options.getString('toggle');
        var data = fs.readFileSync(`users.json`);
        var users = JSON.parse(data);
        const found = users.findIndex( (user) => user.id == interaction.user.id)
        
        if (toggle == 'enable') {
            if (found != -1) {
                users[found].notification = true;
            } else {
                users.push({id: interaction.user.id, points: 0, verifier: false, notification: true});
            }
        }

        if (toggle == 'disable') {
            if (found != -1) {
                users[found].notification = false;
            } else {
                users.push({id: interaction.user.id, points: 0, verifier: false, notification: false});
            }
        }

        fs.writeFile('users.json', JSON.stringify(users, null, 4), async err => {
            if(err) throw err;
            //await interaction.editReply({content:"Item deleted.", ephemeral: true, })
            console.log("Success did notification change: "+ toggle );
            await interaction.reply({content: `Successfully changed preference to: ${toggle}`, ephemeral: true});
            return;
        });
        
        
    },
};
