import { Message } from "discord.js";
export class CommandContext {
	readonly args: string[];
	readonly commandPrefix: string;
	readonly commandName: string;
	readonly originalMessage: Message;

	constructor(prefix: string, message: Message) {
		this.originalMessage = message;
		this.commandPrefix = prefix;
		this.args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		this.commandName = this.args[0];
	}

	/**
	 * Shorthand for CommandContext.originalMessage.reply();
	 */
	async reply (message: string) {
		this.originalMessage.reply(message);
	}
}
