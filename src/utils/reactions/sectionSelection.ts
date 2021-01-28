import { MessageReaction, User } from "discord.js";
import { SMessageController } from "../../database/SMessageController";

interface sectionEmojis {
    [emoji: string]: string
}

export const emojis: sectionEmojis = {
    '1️⃣': '804175032817156096',
    '2️⃣': '804177367152590858',
    '3️⃣': '804177372013264896',
    '4️⃣': '804177372034629682' 
}

export async function sectionSelection (reaction: MessageReaction, user: User) {
    let role_id = emojis[reaction.emoji.name];
    let member = reaction.message.member;

    const client = new SMessageController();


    // Borrowed from discordjs.guide.
    // Removes the user reaction.
    reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
    await reaction.users.remove(user.id);

    if ( role_id != undefined ) {
        
        //Removes any other sections the user may be in
        member?.roles.cache
            .filter(role => Object.values(emojis)
                    .some(id => id == role.id))
            .forEach(role => member?.roles.remove(role));

        let role = await reaction.message.guild?.roles.fetch(role_id);
        if ( role ){
            member?.roles.add(role);
        }
    };
                                         
}
