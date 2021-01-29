import { MessageReaction, User } from "discord.js";
import { RolesController } from "../../database/controllers/RolesController";

export async function sectionSelection (reaction: MessageReaction, user: User) {
    const rolesController = new RolesController();
    let roles = await rolesController.getAll();
    let role_id = await rolesController.get(undefined, undefined, reaction.emoji.name);
    let member = reaction.message.guild?.members.cache.find(member => member.id == user.id);

    // Borrowed from discordjs.guide.
    console.log(role_id);

    // Removes the user reaction.
    reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
    await reaction.users.remove(user.id);

    if ( role_id != undefined ) {
        
        //Removes any other sections the user may be in
        member?.roles.cache
            .filter(role => roles
                    .some(id => id.id == role.id))
            .forEach(role => member?.roles.remove(role));

        let role = await reaction.message.guild?.roles.fetch(role_id.id);
        console.log(role?.name);
        if ( role ){
            console.log("adding to role");
            await member?.roles.add(role);
        }
    };
                                         
}
