import { Command } from "./command";
import { CommandContext } from "../CommandContext";

export class Ping implements Command {
	commandNames: string[] = ["ping"];
	async run(processedMessage: CommandContext) {
		await processedMessage.originalMessage.reply("Pong!");
	}

	getHelpMessage(): string{
		return "Says pong.";
	}
}
