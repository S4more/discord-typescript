"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
var voiceState_1 = require("./voiceState");
var message_event_1 = require("./events/message_event");
var EventHandler = /** @class */ (function () {
    function EventHandler(bot, webSocket) {
        var _this = this;
        this.client = bot;
        this.webSocket = webSocket;
        // Array with all the desired events listeners.
        var events = [
            message_event_1.MessageEvent,
            voiceState_1.VoiceState
        ];
        this.events = events.map(function (event) { return new event(_this.client, _this.logger, _this.webSocket); });
    }
    /** Initializes all the event listeners */
    EventHandler.prototype.run = function () {
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var state = _a[_i];
            state.start();
        }
    };
    EventHandler.prototype.logger = function (serverName, memberName, message) {
        var date = new Date();
        var dateMessage = date.getMonth() + "/" + date.getDate() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.webSocket.sendChat(dateMessage + " [" + serverName + "] " + memberName + ": " + message);
        console.log(dateMessage + " [" + serverName + "] " + memberName + ": " + message);
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
