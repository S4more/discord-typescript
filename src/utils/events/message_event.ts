import { Client } from "discord.js";
import { Event } from "../event";
import { CommandHandler } from "../../command_handler";
import { WebSocket } from "../../site/socket";

export class MessageEvent implements Event {
	client: Client;
	prefix: string = "!";
	commandHandler: CommandHandler = new CommandHandler(this.prefix);
	callback: Function;
    webSocket: WebSocket;

	constructor (client: Client, callback: Function, webSocket: WebSocket) {
		this.client = client;
		this.callback = callback;
        this.webSocket = webSocket;
	}

	start(): void {
		this.client.on('message', message => {
			this.callback(message.guild?.name, message.member?.displayName, message.content);
			if (!message.content.startsWith(this.prefix) || message.author.bot) return;
			this.commandHandler.handleMessage(message);
		});
	}	
}
