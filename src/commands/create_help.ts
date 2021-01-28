import { Command } from "./command";
import { CommandContext } from "../CommandContext";
import { emojis } from "../utils/reactions/sectionSelection"
import { SMessageController} from "../database/SMessageController";

export class CreateSectionSelection implements Command {

    commandNames = ["createSectionSelection"]
    messageController = new SMessageController();

    async run(processedMessage: CommandContext) {
        const message = await processedMessage.reply("Select your section!");
        this.messageController.update(1, message.id);
        
        Object.keys(emojis).forEach(emoji => message.react(emoji));

    }

    getHelpMessage(): string {
        return "Create the selection and the emojis :o";
    }

}
