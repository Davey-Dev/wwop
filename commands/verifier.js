const { Client, SlashCommandBuilder, AttachmentBuilder, Message, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const fs = require('fs');
//const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifier')
        .setDescription('(ADMIN ONLY) Manage Verifiers')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('The action to do')
                .setRequired(true)
                .addChoices(
                    { name: 'Add', value: 'add' },
                    { name: 'Remove', value: 'remove'},
                    { name: 'List', value: 'list'}
                ))
            
        .addUserOption(option => 
            option.setName('target')    
                .setDescription('The user you are adding or removing')),
    async execute(interaction) {
        //console.log(interaction.client);
        //const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
        //await interaction.deferReply({ ephemeral: true});
        const target = interaction.options.getUser('target');
        const type = interaction.options.getString('type');
        var data = fs.readFileSync(`users.json`);
        var users = JSON.parse(data);
        var text = "";
        if(type == "list") {
            text = "List of Verifiers: \n"
            for(user of users) {
                if(user.verifier) {
                    var member = await interaction.client.users.fetch(user.id);
                    text = text + `\n-${member.username}`;
                }
            }
            await interaction.reply({content: text, ephemeral: true});
            return;
        }
        if(!(interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator))) {
            console.log("PERSON IS NOT AN ADMIN");
            await interaction.reply({content:"You do not have permission to do this command!", ephemeral:true,});
            return;
        }
        console.log(interaction.options);
        if(!target) {
            await interaction.reply({content: "You did not mention a user to add or remove!", ephemeral: true});
            return;
        }
        const found = users.findIndex( (user) => user.id == target.id)

        if(type == "add") {
            if(found != -1) {
                users[found].verifier = true;
            } else {
                users.push({id: target.id, points: 0, verifier: true, notification: true});
            }
            fs.writeFile('users.json', JSON.stringify(users, null, 4), async err => {
                if(err) throw err;
                //await interaction.editReply({content:"Item deleted.", ephemeral: true, })
                console.log("Successfully Added Person To Verifiers");
                await interaction.reply({content: `Successfully added ${target.username} to the verifiers list.`, ephemeral: true});
                return;
            });
        } 

        if(type == "remove") {
            if(found != -1) {
                users[found].verifier = false;
            } else {
                users.push({id: target.id, points: 0, verifier: false, notification: true});
            }
            fs.writeFile('users.json', JSON.stringify(users, null, 4), async err => {
                if(err) throw err;
                //await interaction.editReply({content:"Item deleted.", ephemeral: true, })
                console.log("Successfully Removed Person From Verifiers");
                await interaction.reply({content: `Successfully removed ${target.username} from the verifiers list.`, ephemeral: true});
                return;
            });
        } 

        
        
        //await interaction.reply({content: text, ephemeral: true, });
    },
};
