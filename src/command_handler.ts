import { Message } from 'discord.js';
import { CommandContext } from './CommandContext';
import { Command } from './commands/command'
import { CreateSectionSelection } from "./commands/create_help";
import { Ping } from './commands/ping';
import { DefineSection } from './commands/define_section_channel';
import { Help } from './commands/help';


export class CommandHandler {
	private readonly prefix:string;
	private commands: Command[];

	constructor(prefix: string) {
		// Handles all commands
		const commandClasses = [
			Ping,
            CreateSectionSelection,
            DefineSection
		];
		
		this.commands = commandClasses.map((commandClasses) => new commandClasses());
		this.commands.push( new Help(this.commands) );
		this.prefix = prefix;
	}

	async handleMessage(message: Message) {
		if (!this.isCommand(message)) return;
		
		const commandContext: CommandContext = new CommandContext(this.prefix, message);
		const matchedCommand = this.commands.find((command) => 
			command.commandNames.includes(commandContext.commandName));

		if (!matchedCommand) {
			message.reply("This command does not exist.");
		} else {
			await matchedCommand.run(commandContext)
		}

	}

	private isCommand(message: Message): boolean {
		return message.content.startsWith(this.prefix);
	}
}
