import { Client } from 'discord.js';
import { EventHandler } from './utils/event_handler'
import { WebSocket } from './site/socket'
import pool from './database/dbconnector';


const app = require('express')();
const http = require('http').createServer(app);
const token = require('../config.json');

const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const websocket = new WebSocket(http, client); 
const eventHandler: EventHandler = new EventHandler(client, websocket);

pool.connect(function (err, client, done) {
    if (err) console.log(err);
    console.log('Database is ok.');
})

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

