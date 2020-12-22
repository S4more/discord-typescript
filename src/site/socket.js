"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = void 0;
var socketio = __importStar(require("socket.io"));
var discord_js_1 = require("discord.js");
/**
 * Guilhere Samore
 * 22 Dec 2020
 * Handles the socket.io back end connection.
 **/
var WebSocket = /** @class */ (function () {
    function WebSocket(http, client) {
        this.connections = [];
        this.events = [
            // listeners
            this.eDisconnect,
            this.eMessage
        ];
        this.io = new socketio.Server(http);
        this.onConnection(this);
        this.client = client;
    }
    WebSocket.prototype.sendChat = function (message) {
        this.io.emit('new chat', message);
    };
    WebSocket.prototype.onConnection = function (that) {
        this.io.on('connection', function (socket) {
            that.connections.push(socket);
            console.log('connect');
            that.addListeners(socket);
        });
    };
    WebSocket.prototype.addListeners = function (socket) {
        var _this = this;
        this.events.map(function (event) { return event(_this, socket); });
    };
    WebSocket.prototype.eDisconnect = function (that, socket) {
        socket.on('disconnect', function () {
            var i = that.connections.indexOf(socket);
            that.connections.splice(i, 1);
            console.log('disconnect');
        });
    };
    WebSocket.prototype.eMessage = function (that, socket) {
        socket.on('chat message', function (msg) {
            var _a;
            var channel = (_a = that.client.guilds.cache.get('766433573342412831')) === null || _a === void 0 ? void 0 : _a.channels.cache.get('766433573342412834');
            if (channel instanceof discord_js_1.TextChannel) {
                channel.send(msg);
            }
            console.log('message: ' + msg);
        });
    };
    return WebSocket;
}());
exports.WebSocket = WebSocket;
