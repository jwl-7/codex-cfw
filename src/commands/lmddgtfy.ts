import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


export const LMDDGTFY_COMMAND: ICommand = {
    name: 'lmddgtfy',
    description: 'Create a LMDDGTFY link.',
    options: [{
        name: 'query',
        description: "<search query>",
        type: InteractionType.MESSAGE_COMPONENT,
        required: true
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const search = interaction.data.options?.[0]?.value as string
        const url = 'https://lmddgtfy.net/?q='
        const link = `${url}${encodeURIComponent(search)}`

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    fields: [{
                        name: 'Let Me DuckDuckGo That For You',
                        value: link
                    }]
                }]
            },
        }
    },
}
