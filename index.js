const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	let messageParts = message.content.split(' ');
	let messageBegin = messageParts[0];
	let messageEnd = messageParts[1];
	if (messageBegin === '!clear') {
		if (!messageEnd)
			return message.reply("You haven't given an amount of messages which should be deleted!"); // Checks if the `amount` parameter is given
		messageEnd = Number(messageEnd);
		if (isNaN(messageEnd)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
		if (messageEnd % 1 !== 0) {
			return message.reply('The Number of messages to delete must be a whole number!');
		}

		if (messageEnd > 99) return message.reply('You can`t delete more than 99 messages at once!'); // Checks if the `amount` integer is bigger than 100
		if (messageEnd < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
		await message.channel.messages.fetch({ limit: messageEnd + 1 }).then(messages => {
			message.channel.bulkDelete(messages);
		});
	}

	if (message.content === '!1') {
		// Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
		// Check if user is in a voice channel:
		if (message.member.voice.channel) {
			let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
			for (const [memberID, member] of channel.members) {
				// I added the following if statement to mute everyone but the invoker:
				// if (member != message.member)

				// This single line however, nested inside the for loop, should mute everyone in the channel:
				member.voice.setMute(true);
			}
		} else {
			message.reply('You need to join a voice channel first!');
		}
	}

	if (message.content === '!announcement') {
		// Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
		// Check if user is in a voice channel:
		if (message.member.voice.channel) {
			let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
			for (const [memberID, member] of channel.members) {
				if (member === message.member) {
					member.voice.setMute(false);
				}
				// I added the following if statement to mute everyone but the invoker:
				if (member != message.member)
					if (!message.member.voice.mute) {
						// This single line however, nested inside the for loop, should mute everyone in the channel:
						member.voice.setMute(true);
					}
			}
		} else {
			message.reply('You need to join a voice channel first!');
		}
	}
	if (message.content === '!2') {
		// Your invokation here, for example your switch/case hook for some command (i.e. '!muteall')
		// Check if user is in a voice channel:
		if (message.member.voice.channel) {
			let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
			for (const [memberID, member] of channel.members) {
				// I added the following if statement to mute everyone but the invoker:
				// if (member != message.member)

				// This single line however, nested inside the for loop, should mute everyone in the channel:
				member.voice.setMute(false);
			}
		} else {
			message.reply('You need to join a voice channel first!');
		}
	}
});

client.login(process.env.token);
