"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var event_handler_1 = require("./utils/event_handler");
var socket_1 = require("./site/socket");
var app = require('express')();
var http = require('http').createServer(app);
var client = new discord_js_1.Client();
var websocket = new socket_1.WebSocket(http, client);
var eventHandler = new event_handler_1.EventHandler(client, websocket);
client.on('ready', function () {
    console.log("I am ready!");
    eventHandler.run();
});
client.login("Nzg2MDI2MDIxNTMwODk0MzU3.X9AZxw.4D9pf6Hb07vZCFix73PcC17O-WE");
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/site/index.html');
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
