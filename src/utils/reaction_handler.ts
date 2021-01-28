import { MessageReaction, User } from "discord.js";
import { sectionSelection } from "./reactions/sectionSelection";
import { SMessageController} from "../database/SMessageController";

interface TriggerMessage {
    [id: string]: Function;
}


export class ReactionHandler {
    trigers = [
        sectionSelection,
    ]

    controller = new SMessageController();

    triggerArray: TriggerMessage = {};

    updateTriggerArray() { 
        this.triggerArray = {};
        this.controller.get().then(array => {
            if (array) {
               for (let i = 0; i < array.length; i++) {
                    this.triggerArray[array[i].message_id] = this.trigers[i];
               }
            }
        });
    }

    constructor() {
        this.updateTriggerArray();
    }

    async handleReaction(reaction: MessageReaction, user: User) {
        try {
            if (user.bot) { 
                this.updateTriggerArray();
                return;
            }
            console.log(this.triggerArray);
            await this.triggerArray[reaction.message.id](reaction, user);
        } catch (error){
            console.log("Message has no action");
        }
    }
}
