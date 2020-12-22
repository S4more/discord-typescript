import * as socketio from 'socket.io'
import {Client, TextChannel} from "discord.js"

/**
 * Guilhere Samore
 * 22 Dec 2020
 * Handles the socket.io back end connection. 
 **/

export class WebSocket {
    private readonly io: socketio.Server;
    private client: Client;
    private connections: socketio.Socket[] = [];
    private events: Function[] = [
        // listeners
        this.eDisconnect,
        this.eMessage
    ];

    constructor (http:any, client: Client) {
        this.io = new socketio.Server(http);
        this.onConnection(this);
        this.client = client;
    }

    public sendChat(message: string) {
        this.io.emit('new chat', message);
    }

    private onConnection(that: WebSocket) {
        this.io.on('connection', (socket: socketio.Socket) => {
            that.connections.push(socket);
            console.log('connect');
            that.addListeners(socket);
        });
    }

    private addListeners(socket: socketio.Socket) {
        this.events.map((event) => event(this, socket));
    }

    private eDisconnect(that: WebSocket, socket: socketio.Socket) { 
        socket.on('disconnect', function() {
            let i = that.connections.indexOf(socket);
            that.connections.splice(i, 1);
            console.log('disconnect');
        });
    }

    private eMessage(that: WebSocket, socket: socketio.Socket) {
        socket.on('chat message', (msg:string) => {
            let channel = that.client.guilds.cache.get('766433573342412831')?.channels.cache.get('766433573342412834');
            if (channel instanceof TextChannel) {
                channel.send(msg);
            }


            console.log('message: ' + msg);
        });
    }
}
