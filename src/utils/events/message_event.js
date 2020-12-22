"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = void 0;
var command_handler_1 = require("../../command_handler");
var MessageEvent = /** @class */ (function () {
    function MessageEvent(client, callback, webSocket) {
        this.prefix = "!";
        this.commandHandler = new command_handler_1.CommandHandler(this.prefix);
        this.client = client;
        this.callback = callback;
        this.webSocket = webSocket;
    }
    MessageEvent.prototype.start = function () {
        var _this = this;
        this.client.on('message', function (message) {
            var _a, _b;
            _this.callback((_a = message.guild) === null || _a === void 0 ? void 0 : _a.name, (_b = message.member) === null || _b === void 0 ? void 0 : _b.displayName, message.content);
            if (!message.content.startsWith(_this.prefix) || message.author.bot)
                return;
            _this.commandHandler.handleMessage(message);
        });
    };
    return MessageEvent;
}());
exports.MessageEvent = MessageEvent;
