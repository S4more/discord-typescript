import { Client } from "discord.js";
import { Event } from "./event";
import { VoiceState } from "./voiceState";
import { WebSocket } from "./../site/socket";
import { MessageEvent } from "./events/message_event";
import { ReactionEvent } from "./events/reaction_event";

export class EventHandler {
	private client: Client;
	private events: Event[];
    private webSocket: WebSocket;
	constructor(bot: Client, webSocket: WebSocket) {
		this.client = bot;
        this.webSocket = webSocket;
		// Array with all the desired events listeners.
		const events = [
			MessageEvent,
			VoiceState,
            ReactionEvent
		];
		
		this.events = events.map((event) => new event(this.client, this.logger, this.webSocket));
		
	}

	/** Initializes all the event listeners */
	run(): void {
		for (let state of this.events) {
			state.start();
		}
	}

	logger(serverName: string, memberName: string, message:string) {
		let date = new Date();
		let dateMessage: string = `${date.getMonth()}/${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		this.webSocket.sendChat(`${dateMessage} [${serverName}] ${memberName}: ${message}`)
		console.log(`${dateMessage} [${serverName}] ${memberName}: ${message}`)
	}	
}
