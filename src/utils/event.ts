import { Client } from "discord.js"; 
import { WebSocket } from "./../site/socket";

export interface Event {
	client: Client;
	callback: Function;
    webSocket: WebSocket;
	start(): void;
}
