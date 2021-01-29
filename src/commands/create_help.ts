import { Command } from "./command";
import { CommandContext } from "../CommandContext";
import { RolesController } from "../database/controllers/RolesController";
import { SMessageController} from "../database/SMessageController";

export class CreateSectionSelection implements Command {

    commandNames = ["createSectionSelection"]
    messageController = new SMessageController();
    rolesController = new RolesController();

    async run(processedMessage: CommandContext) {
        const message = await processedMessage.reply("Select your section!");
        this.messageController.update(1, message.id);
        
        const roles = await this.rolesController.getAll()
        roles.forEach(role => message.react(role.emoji));

    }

    getHelpMessage(): string {
        return "Create the selection and the emojis :o";
    }

}
