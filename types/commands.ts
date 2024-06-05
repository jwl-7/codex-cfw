import { APIApplicationCommandInteraction, APIInteractionResponseCallbackData } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'


export interface ICommand {
    name: string,
    description: string,
    run: (interaction: APIApplicationCommandInteraction) => Promise<ICommandResponseBody>
}

export interface ICommandResponseBody {
    type: InteractionResponseType
    data: APIInteractionResponseCallbackData
}
