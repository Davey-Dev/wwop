const { SlashCommandBuilder, AttachmentBuilder, Message } = require('discord.js');
const fs = require('fs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest items for the wheel.')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Set the name of the new Wheel item.'))
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Set the description of the new Wheel item.')),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true});
        //console.log(interaction.user.id)
        if(interaction.options.getString('name') == null) {
            await interaction.editReply({content:"Please make sure the name slot is filled!", ephemeral:true, });
            return;
        }
        var wheel = fs.readFileSync('suggestions.json');
        var obj = JSON.parse(wheel);
        //console.log(obj);
        var newObj = {
            "name":interaction.options.getString('name'),
            "description":interaction.options.getString('description') ?? ""
        };
        obj.push(newObj);
        //console.log(obj); 
        fs.writeFile('suggestions.json', JSON.stringify(obj, null, 4), async err => {
            if(err) throw err;
            await interaction.editReply({ content:"New item added.", ephemeral:true, });
            console.log("New data added");
        });
    },
};
