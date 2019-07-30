/*eslint-disable*/
module.exports = {

	/**
	 * Instructions on how to get this: https://redd.it/40zgse
	 */
	yourID: "",

	setupCMD: "!createrolemessage",

	/**
	 * Delete the 'setupCMD' command after it is ran. Set to 'true' for the command message to be deleted
	 */
	deleteSetupCMD: false,

	initialMessage: `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`,
	
	embedMessage: `
	React to the emoji that matches the role you wish to receive.
	
	If you would like to remove the role, simply remove your reaction!
	`,
	
	/**
	 * Must set this if "embed" is set to true
	 */
	embedFooter: "Role Reactions",

	roles: {

		// List your first role with the emoji you want like "emoji": "roleName"
		"💻": "Hacker",

		// Don't forget to put a comma afterwards!
		"🖌": "Artist",

		// And so on
		"😃": "Public Relations",

		// You can put up to 25 here
		"🆕": "Intern",

		//You can also use the name of the emoji, ex: :customEmoji1: to get a role
		"customEmoji1": "myRole1"
	},

	/**
	 * Set to "true" if you want all roles to be in a single embed
	 */
	embed: true,

	/**
	 * Set the embed color if the "embed" variable is et to "true"
	 * Format:
	 * 
	 * #dd9323
	 */
	embedColor: "#dd9323",

	
	/**
	 * Set the embed error color if the "embed" variable is set to "true"
	 * Format:
	 * #dd9323
	 */
	embedErrorColor: "#FF0000",

	/**
	 * Set to "true" if you want to set a thumbnail in the embed
	 */
	embedThumbnail: false,

	/**
	 * The link for the embed thumbnail if "embedThumbnail" is set to true
	 */
	embedThumbnailLink: "",

	/**
	 * You"ll have to set this up yourself! Read more below:
	 * Please do not commit this token to the public if you contributed to this repository
	 * or host your code anywhere online. Giving someone your bot's token is the equivalent
	 * to giving someone the keys to your house and walking away!
	 * 
	 * https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
	 */
	botToken: ""
};
