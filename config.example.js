/*eslint-disable*/
module.exports = {

	//CREDENTIALS

	//Your Discord ID. Instructions on how to get this: https://redd.it/40zgse
	yourID: "",

	/**
	 * You"ll have to set this up yourself! Read more below:
	 * Please do not commit this token to the public if you contributed to this repository
	 * or host your code anywhere online. Giving someone your bot's token is the equivalent
	 * to giving someone the keys to your house and walking away!
	 * 
	 * https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
	 */
	botToken: "",

	//PERSONALISATION

	//The command you want to post the message. Should be supplied with a numerical argument (ex: 1, 2) if you have multiple 'embeds' of roles.
	setupCMD: "!createrolemessage",

	//Should the command be deleted after it is run?
	deleteSetupCMD: true,
	
	//FORMATTING
	
	//Do you want your reactions to be posted as one big embed with reactions underneath?
	embed: true,

	//If not, the mesages will be posted emoji by emoji:

		//What should the first message say?
		initialMessage: `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`,
	
	//If yes, you need to fill in the following details about your embed:

		embedMessage: `
			React to the emoji that matches the role you wish to receive.
			If you would like to remove the role, simply remove your reaction!
		`,

		//Must set this if "embed" is set to true
		embedFooter: "Role Reactions",

		//Set the embed color if the "embed" variable is set to "true". Hex Format, ex: #dd9323
		embedColor: "#dd9323",

		//Set the embed error color if the "embed" variable is set to "true". Hex Format, ex: #dd9323
		embedErrorColor: "#FF0000",

		//Set to "true" if you want to set a thumbnail in the embed
		embedThumbnail: false,

		//The link for the embed thumbnail if "embedThumbnail" is set to true
		embedThumbnailLink: "",

	//THE ROLES

	//Please enter them below in 'key: value,' format. Don't forget to put a comma afterwards! Write up to 25 if you set 'embed: true'
	roles: {
		"💻": "Hacker",
		"🖌": "Artist",
		"😃": "Public Relations",
		"🆕": "Intern",
		"customEmoji1": "myRole1"
	},

	//You can use either 'names' of emojis, like what you'd write with :GWPingSock: or the unicodes. See above examples.
	
	/**
	 * Note: you can also create several of these if you want to get around the 25-length embed limit by:
	 * setting the 'roles' object above to {}
	 * creating a new object called 'embed1' below this
	 * with the exact same format as the roles object.
	 * Each 'embedn' object, where n is a number can be outputted with the command '${setupCMD} ${n}', ex: '!createrolemessage 1'
	 */

	embed1: {},
	embed2: {},
};
