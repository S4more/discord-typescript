import {CommandContext} from "../CommandContext";
export interface Command {
	readonly commandNames: string[];
	run(processedMessage: CommandContext): Promise<void>;
	getHelpMessage(): string;

}
