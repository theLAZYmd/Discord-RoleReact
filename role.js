/* eslint-disable*/
// Import constructors, configuration and login the client
const { Client, RichEmbed, Emoji, MessageReaction } = require('discord.js');
const CONFIG = require('./config');
const PACKAGE = require('./package.json');

const client = new Client({ disableEveryone: true });
if (CONFIG.botToken === '')
    throw new Error("The 'botToken' property is not set in the config.js file. Please do this!");

// If there isn't a reaction for every role, alert the user
if (CONFIG.roles.length !== CONFIG.reactions.length)
    throw "Roles list and reactions list are not the same length! Please double check this in the config.js file";

// Function to generate the role messages, based on your settings
function generateMessages() {
    return CONFIG.roles.map((r, e) => {
        return {
            role: r,
            message: `React below to get the **"${r}"** role!`, //DONT CHANGE THIS,
            emoji: CONFIG.reactions[e]
        };
    });
}

// Client events to let you know if the bot is online and to handle any Discord.js errors
client.on("ready", () => {
	console.log("Role Reactions is online!");
	if (Array.isArray(CONFIG.roles) || Array.isArray(CONFIG.reactions)) throw `Config with .roles and .reactions is deprecated in ${PACKAGE.version} of the bot. Please review new CONFIG format.`
});
client.on('error', console.error);

// Handles the creation of the role reactions. Will either send the role messages separately or in an embed
client.on("message", message => {
	try {

		// Make sure bots can't run this command
		if (message.author.bot) throw '';

		// Make sure the command can only be ran in a server
		if (!message.guild) throw '';

		// if wrong command is used
		if (message.content.toLowerCase() !== CONFIG.setupCMD) throw '';

		// If some person who is not you is trying to set up the bot
		if ((message.author.id !== CONFIG.yourID)) throw '';

		// Check: can the bot send messages in this particular channel? If not, do nothing
		if (!message.channel.memberPermissions(message.guild.me).has('SEND_MESSAGES')) throw '';

		// Check: can the bot delete messages? If not that's an error
		if (CONFIG.deleteSetupCMD) {
			if (!message.channel.memberPermissions(message.guild.me).has('MANAGE_MESSAGES'))
				throw new Error("I need permission to delete your command message! Please assign the 'Manage Messages' permission to me in this channel!");
			message.delete().catch(()=>{});
		}

		// Check: can the bot add reactions? If not that's an error
		if (!message.channel.memberPermissions(message.guild.me).has('ADD_MESSAGES'))
			throw new Error("I need permission to add reactions to these messages! Please assign the 'Add Reactions' permission to me in this channel!");

		const fields = Object.entries(CONFIG.roles);

		// Does the user want the response to be in the form of a large embed?
		if (!CONFIG.embed) {

			// All well and good that the user wants a message but have they set their initial message?
			if (!CONFIG.initialMessage || (CONFIG.initialMessage === '')) 
				throw new Error("The 'initialMessage' property is not set in the config.js file. Please do this!");

			message.channel.send(CONFIG.initialMessage);

			for (let [emoji, role] of fields) {
				if (!message.guild.roles.find(r => r.name === role))
					throw `The role '${role}' does not exist!`;

				message.channel.send(`React below to get the **"${role}"** role!`).then(async m => {
					let customCheck = message.guild.emojis.find(e => e.name === emoji);
					if (!customCheck) await m.react(emoji);
					else await m.react(customCheck.id);
				}).catch(console.error);
			}
		} else {
			
			// All well and good that the user wants an embed but have they filled in the properties?
			if (!CONFIG.embedMessage)
				throw new Error("The 'embedMessage' property is not set in the config.js file. Please do this!");
			if (!CONFIG.embedFooter)
				throw new Error("The 'embedFooter' property is not set in the config.js file. Please do this!");
			if (!CONFIG.embedColor)
				throw new Error("The 'embedColor' property is not set in the config.js file. Please do this!");

			const roleEmbed = new RichEmbed()
				.setDescription(CONFIG.embedMessage)
				.setFooter(CONFIG.embedFooter)
				.setColor(CONFIG.embedColor)
				.setThumbnail(CONFIG.embedThumbnailLink || message.guild.iconURL || undefined);

			if (fields.length > 25) throw new Error("That maximum roles that can be set for an embed is 25!");
			for (let [emoji, role] of fields) {
				if (!message.guild.roles.find(r => r.name === role))
					throw new Error(`The role '${role}' does not exist!`);

				const customEmote = client.emojis.find(e => e.name === emoji);
				if (!customEmote) roleEmbed.addField(emoji, role, true);
				else roleEmbed.addField(customEmote, role, true);
			}

			message.channel.send(roleEmbed).then(async m => {
				for (let [emoji] of fields) {
					const customCheck = client.emojis.find(e => e.name === emoji);
					if (!customCheck) await m.react(emoji);
					else await m.react(customCheck.id);
				}
			});
		}
	} catch (e) {
		if (!e || !e.message) return;
		if (CONFIG.embed) message.channel.send({
			color: CONFIG.embedErrorColor,
			description: e.message
		})
		else message.channel.send(e.message);
	}
});

// This makes the events used a bit more readable
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// This event handles adding/removing users from the role(s) they chose based on message reactions
client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	
	// Generate properties usable for the rest of the function
    const user = client.users.get(data.user_id);
    const message = await channel.fetchMessage(data.message_id);
    const channel = client.channels.get(data.channel_id);
	const member = message.guild.members.get(user.id);
	// Checks for when not to react
	if (user.bot) return;
	if (message.author.id !== client.user.id) return;
	if (channel.memberPremissions(client.guild.me).has('ADD_MESSAGES')) return;
	// Generate a 'reaction' object
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reaction = message.reactions.get(emojiKey);
    if (!reaction) {
        const emoji = new Emoji(client.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === client.user.id);
	}
	
	let roleName = CONFIG.ROLES[reaction.emoji.name];
	if (!roleName) return;
	let guildRole = message.guild.roles.find(r => r.name === value);
	if (!guildRole) return;
	if (event.t === "MESSAGE_REACTION_ADD") member.addRole(guildRole.id);
	else if (event.t === "MESSAGE_REACTION_REMOVE") member.removeRole(guildRole.id);
});

process.on('unhandledRejection', err => {
    const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
	console.error("Unhandled Rejection", msg);
});


client.login(CONFIG.botToken);