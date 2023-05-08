const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const funcs = require('../wwop-functions.js');
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {

		    const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                console.error(error);
            }
        } else if (interaction.isButton()) {
            //console.log(interaction);
            if(interaction.customId == 'verify' || interaction.customId == 'bogoverify') {
                var file = fs.readFileSync("users.json");
                var users = JSON.parse(file);
                var indexThing = users.findIndex( (user) => user.id == interaction.member.user.id);
                console.log(indexThing);
                var verifier = false;
                if (indexThing != -1) {
                    if(users[indexThing].verifier) {
                        console.log("person is verifier")
                        verifier = true;
                    }
                }
                
                if(interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator) || verifier) {
                    const verify = new ButtonBuilder()
                        .setCustomId('verify')
                        .setLabel('Verified')
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true);
                    const spinagain = new ButtonBuilder()
                        .setCustomId('spin')
                        .setLabel('Spin')
                        .setStyle(ButtonStyle.Primary)
            
                    const row = new ActionRowBuilder()
                        .addComponents(spinagain, verify);

                    const verifydismiss = new ButtonBuilder()
                        .setCustomId('verifydismiss')
                        .setLabel('Dismiss')
                        .setStyle(ButtonStyle.Secondary)

                    const verifyrow = new ActionRowBuilder()
                        .addComponents(verifydismiss);

                    
                    var newuserid = interaction.message.content.substr(2, 18);
                    console.log(newuserid);
                    console.log(users[0].id);
                    var found = users.findIndex( (user) => user.id == newuserid)
                    console.log(found);
                    if(found != -1) {
                        console.log("Added points to an existing person");
                        users[found].points++;
                        if(interaction.customId == 'bogoverify') {
                            users[found].points++;
                        }
                    } else {
                        console.log("Added new person");
                        if(interaction.customId == 'bogoverify') {
                            found = users.push({id: newuserid, points: 2, verifier: false, notification: true}) - 1;
                        } else {
                            found = users.push({id: newuserid, points: 1, verifier: false, notification: true}) - 1;
                        }
                        
                    }
                    fs.writeFile('users.json', JSON.stringify(users, null, 4), async err => {
                        if(err) throw err;
                        //await interaction.editReply({content:"Item deleted.", ephemeral: true, })
                        console.log("Verified Punishment");
                    });
                    await interaction.update( { components: [row] })
                    if (users[found].notification) {
                        await interaction.client.users.send(newuserid, `Your punishment has been verified by ${interaction.member.user.username}`)
                    }
                    if (users[found].points == 1) {
                        await interaction.client.users.send(newuserid, `If you don't want verification notifications in the future, please use /notification disable to toggle them off!`);
                    }
                    
                    //await interaction.followUp({ content:`Punishment verified.`, ephemeral: true });
                    
                } else {
                    await interaction.reply({ content: "You do not have permissions to verify punishments! Please contact an administrator if you think this is an error!", ephemeral: true });
                }
            } else if (interaction.customId == 'spin') {
                console.log("Using button");
                //console.log(interaction);
                funcs.spin(interaction);
            } else if (interaction.customId == 'skip') {
                console.log("User wants to skip");
                var newuserid = interaction.message.content.substr(2, 18);
                if(interaction.member.user.id == newuserid) {
                    console.log("Users Match");
                    //interaction.message.delete();
                    const skip = new ButtonBuilder()
                        .setCustomId('skip')
                        .setLabel('Skipped')
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(true);
                    const verify = new ButtonBuilder()
                        .setCustomId('verify')
                        .setLabel('Verify')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true);    
                    const spinagain = new ButtonBuilder()
                        .setCustomId('spin')
                        .setLabel('Spin')
                        .setStyle(ButtonStyle.Primary)

                    const row = new ActionRowBuilder()
                        .addComponents(spinagain, verify, skip);

                    await interaction.update( { components: [row] })
                    
                } else {
                    console.log("Users Dont Match");
                    interaction.reply({ content: "This punishment can only be skipped by the user it is for!", ephemeral: true});
                }
            } else if (interaction.customId == 'lol') {
		    funcs.lol(interaction);
	    }
        }
	},
};
