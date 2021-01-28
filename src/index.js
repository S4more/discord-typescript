"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var event_handler_1 = require("./utils/event_handler");
var socket_1 = require("./site/socket");
var SMessageController_1 = require("./database/SMessageController");
var dbconnector_1 = __importDefault(require("./database/dbconnector"));
var app = require('express')();
var http = require('http').createServer(app);
var token = require('../config.json');
var client = new discord_js_1.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
var websocket = new socket_1.WebSocket(http, client);
var eventHandler = new event_handler_1.EventHandler(client, websocket);
dbconnector_1.default.connect(function (err, client, done) {
    if (err)
        console.log(err);
    console.log('Database is ok.');
});
var smessage = new SMessageController_1.SMessageController();
//smessage.get(1).then(row => console.log(row));
client.on('ready', function () {
    console.log("I am ready!");
    eventHandler.run();
});
client.login(token.token);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/site/index.html');
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
