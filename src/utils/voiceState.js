"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceState = void 0;
var VoiceState = /** @class */ (function () {
    function VoiceState(client, callback, webSocket) {
        this.client = client;
        this.callback = callback;
        this.webSocket = webSocket;
    }
    VoiceState.prototype.start = function () {
        var _this = this;
        this.client.on('voiceStateUpdate', function (oldState, newState) {
            var _a, _b, _c;
            var oldChannelName = (_a = oldState.channel) === null || _a === void 0 ? void 0 : _a.name;
            var newChannelName = (_b = newState.channel) === null || _b === void 0 ? void 0 : _b.name;
            var message;
            var serverName = oldState.guild.name;
            var memberName = (_c = oldState.member) === null || _c === void 0 ? void 0 : _c.displayName;
            if (oldState.channelID == null) {
                message = "joined " + newChannelName;
            }
            else if (newState.channelID == null) {
                message = "disconnected";
            }
            else {
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
                }
                else {
                    message = "chhanged channels from " + oldChannelName + " to " + newChannelName;
                }
            }
            _this.callback(serverName, memberName, message);
        });
    };
    return VoiceState;
}());
exports.VoiceState = VoiceState;
