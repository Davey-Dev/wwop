const { SlashCommandBuilder, AttachmentBuilder, Message, PermissionsBitField } = require('discord.js');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('(ADMIN ONLY) Add items to the wheel.')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Set the name of the new Wheel item.'))
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Set the description of the new Wheel item.'))
	.addNumberOption(option =>
	    option
		.setName('suggestion')
		.setDescription('The index of the suggestion you wish to add to the Wheel.')),
    async execute(interaction) {
        await interaction.deferReply();
        //console.log(interaction.user.id)
        if(!(interaction.memberPermissions.has(PermissionsBitField.Flags.Administrator))) {
            console.log("PERSON IS NOT AN ADMIN");
            await interaction.editReply({content:"You do not have permission to do this command!", ephemeral:true,});
            return;
        }
	if(interaction.options.getNumber('suggestion') != null) {
		var fileThing = fs.readFileSync('suggestions.json');
		var suggestions = JSON.parse(fileThing);
		if(!(interaction.options.getNumber('suggestion') >= 0 && interaction.options.getNumber('suggestion') < suggestions.length)) {
            		console.log("Not in range");
            		await interaction.editReply({content:"That index is not valid!", ephemeral: true, });
            		return;
 		}
		const choice = Math.floor(interaction.options.getNumber('suggestion'));
		const newObj = suggestions[choice];
		suggestions.splice(choice, 1);

		fs.writeFile('suggestions.json', JSON.stringify(suggestions, null, 4), async err => {
            		if(err) throw err;
            		//await interaction.editReply({content:"Item deleted.", ephemeral: true, })
            		console.log("Item deleted from suggestions.");
        	});

		fileThing = fs.readFileSync('wheel.json');
		var wheel = JSON.parse(fileThing);

		wheel.push(newObj);

		fs.writeFile('wheel.json', JSON.stringify(wheel, null, 4), async err => {
                        if(err) throw err;
                        await interaction.editReply({content:"Item successfully added to wheel and removed from suggestions.", ephemeral: true, })
                        console.log("Item added to wheel from suggestions.");
			return;
                });



		
	} else {
        if(interaction.options.getString('name') == null) {
            await interaction.editReply({content:"Please make sure the name slot is filled!", ephemeral:true, });
            return;
        }
        var wheel = fs.readFileSync('wheel.json');
        var obj = JSON.parse(wheel);
        //console.log(obj);
        var newObj = {
            "name":interaction.options.getString('name'),
            "description":interaction.options.getString('description') ?? ""
        };
        obj.push(newObj);
        //console.log(obj); 
        fs.writeFile('wheel.json', JSON.stringify(obj, null, 4), async err => {
            if(err) throw err;
            await interaction.editReply({ content:"New item added.", ephemeral:true, });
            console.log("New data added");
        });
	}},
};
