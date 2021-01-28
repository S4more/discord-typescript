import { Client } from "discord.js";
import { Event } from "../event";
import { WebSocket } from "../../site/socket";
import { ReactionHandler } from "../reaction_handler";

export class ReactionEvent implements Event {
	client: Client;
	callback: Function;
    webSocket: WebSocket;
    reactionHandler: ReactionHandler = new ReactionHandler();

	constructor (client: Client, callback: Function, webSocket: WebSocket) {
		this.client = client;
		this.callback = callback;
        this.webSocket = webSocket;
	}

	start(): void {
		this.client.on('messageReactionAdd', async (reaction, user) => {
            // It should be inside an if statement but I don't know how
            // To handle it in typescript.

            user = await user.fetch();
            reaction = await reaction.fetch();
            this.reactionHandler.handleReaction(reaction, user);
			//this.callback(message.guild?.name, message.member?.displayName, message.content);
		});
	}	
}
