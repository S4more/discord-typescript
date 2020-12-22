import { Client } from 'discord.js';
import { EventHandler } from './utils/event_handler'
import { WebSocket } from './site/socket'


const app = require('express')();
const http = require('http').createServer(app);
const token = require('../config.json');

const client = new Client();
const websocket = new WebSocket(http, client); 
const eventHandler: EventHandler = new EventHandler(client, websocket);

client.on('ready', () => {
	console.log("I am ready!");	
	eventHandler.run();	
});

client.login(token.token);

app.get('/', (req:any, res:any) => {
  res.sendFile(__dirname + '/site/index.html');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

