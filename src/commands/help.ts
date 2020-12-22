import { Command } from "./command";
import { CommandContext } from "../CommandContext";

export class Help implements Command {

	commandNames = ["help", "ajuda"];;
	private commands: Command[];

	constructor(commands: Command[]) {
		this.commands = commands;
	}

	async run(commandContext: CommandContext) {
		if (commandContext.args.length === 1) {
			const commandNames = this.commands.map(commands => commands.commandNames[0]);
			await commandContext.reply("\n" + commandNames.join('\n') +
			"\nTo learn more about a commmand use `!help command`.");
		} else {
			const matchedCommand = this.commands.find(command => 
				command.commandNames.includes(commandContext.args[1]));
			if (matchedCommand) {
				commandContext.reply(matchedCommand.getHelpMessage());
			} else {
				commandContext.reply("Command not found. Use !help to see all the commands");
			}
		}
	}

	getHelpMessage() {
		return "I guess you already know this command...";
	}

}
