import { Event } from "./event";
import { Client } from "discord.js";
import { WebSocket } from "../site/socket";


export class VoiceState implements Event {
	readonly client : Client;
	readonly callback: Function;
    readonly webSocket: WebSocket;

	constructor (client : Client, callback: Function, webSocket: WebSocket) {
		this.client = client;
		this.callback = callback;
        this.webSocket = webSocket;
	}

	start(): void {
		this.client.on('voiceStateUpdate', (oldState, newState) => {
			const oldChannelName = oldState.channel?.name;
			const newChannelName = newState.channel?.name;
			let message; 
			let serverName = oldState.guild.name;
			let memberName = oldState.member?.displayName;

			if (oldState.channelID == null) {
				message = `joined ${newChannelName}`;
			} else if (newState.channelID == null) {
				message = `disconnected`;
			} else {
				// In case the member didn't change channels.
				if (oldChannelName == newChannelName) {
					// Mute action
					if (oldState.mute != newState.mute) {
						message = oldState.mute ? "unmuted." : "muted";
						// A user can not deaf itself without deaf. It can only occurs if
						// he is server muted.
						if (oldState.deaf != newState.deaf) {
							message += " | ";
							message += oldState.deaf ? "undeaf." : "deaf";
						}
					}

					// Deafen action
					else if (oldState.deaf != newState.deaf) {
						message = oldState.deaf ? "undeaf." : "deaf";
					}

					else if (oldState.streaming != newState.streaming) {
						message = oldState.streaming ? "stopped streaming" : "started streaming";
					}

				} else {
					message = `chhanged channels from ${oldChannelName} to ${newChannelName}`;
				}
			}
			this.callback(serverName, memberName, message)	
		});
	}


}
