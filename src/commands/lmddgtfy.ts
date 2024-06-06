import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


export const LMDDGTFY_COMMAND: ICommand = {
    name: 'lmddgtfy',
    description: 'Create a LMDDGTFY link.',
    options: [{
        name: 'query',
        description: '<search query>',
        type: InteractionType.MESSAGE_COMPONENT,
        required: true
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const search = interaction.data.options?.[0]?.value
        const link = `${constants.LMDDGTFY_URL}${encodeURIComponent(search)}`

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
