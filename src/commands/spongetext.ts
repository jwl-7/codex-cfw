import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


export const SPONGETEXT_COMMAND: ICommand = {
    name: 'spongetext',
    description: 'Convert text to sPoNgEbOb mOcKiNg tExT.',
    options: [{
        name: 'text',
        description: '<text>',
        type: InteractionType.MESSAGE_COMPONENT,
        required: true
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const inputText = interaction.data.options?.[0]?.value
        let spongeText = ''

        for (let i = 0; i < inputText.length; i++) {
            const char = inputText[i]
            spongeText += (i % 2 === 0) ? char.toLowerCase() : char.toUpperCase()
        }

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    description: spongeText
                }]
            },
        }
    },
}
