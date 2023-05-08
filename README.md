# Wacky Wheel of Pain

Note that this bot uses node v16.11.0.

How to set up this bot.

1. Download all files from this repository.
2. Use `npm install` to download all modules.
3. Set up a discord bot at https://discord.com/developers.
    - Copy the bot token into the `token` field in the `config.json` file.
    - Copy the application id into the `clientId` field in the `config.json` file.
    - Enable all 3 privileged gateway intents.
4. Assuming you have developer mode enabled on Discord, right click on your main Discord server and copy the Server ID into the `guildId` field in the `config.json` file.
5. You will need 2 fonts in a `.fnt` format. Make sure you copy the file names into the `fonts.json` file.
6. The separate locations for image generation commands are `wwop-functions.js`, `commands/show.js`, and `commands/generate.js`. If you make any changes regarding text location, those are your files.
7. The background image is based off of `template.png`. Also there's a `Mercy.png` image hardcoded.

Before you run `wwop.js`, you will need to run `deploy-commands.js`.
