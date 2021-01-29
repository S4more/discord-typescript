import { Command } from "./command";
import { CommandContext } from "../CommandContext";
import { RolesController } from "../database/controllers/RolesController";

export class DefineSection implements Command {
    commandNames = ["DefineSection"];
    rolesController = new RolesController();

    async run(processedMessage: CommandContext) {
        const role = processedMessage.originalMessage.mentions.roles.first();
        console.log(processedMessage.args);
        if (!role) {
            await processedMessage.reply("Wrong command usage!");
            return;
        }
       
        try {
            await this.rolesController.put(role.id, role.name, processedMessage.args[2])
            await processedMessage.reply(`Sucessfuly registered ${role.name} in the database.`);
        } catch (error) {
            console.log(error);
            await processedMessage.reply("something went wrong.");
        }

        //console.log(`Creating entry in database...\n
         //           In table roles: ${role.name} -> ${role.id}`)
    }

    getHelpMessage(): string {
        return "Define the class and channel for each section"
    }

}
