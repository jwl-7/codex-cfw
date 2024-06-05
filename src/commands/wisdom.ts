import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { chopraJargon } from '@/jargon/chopra'


export const WISDOM_COMMAND: ICommand = {
    name: 'wisdom',
    description: 'Generate Deepak Chopra quote.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const part0 = getRandomElement(chopraJargon.words0)
        const part1 = getRandomElement(chopraJargon.words1)
        const part2 = getRandomElement(chopraJargon.words2)
        const part3 = getRandomElement(chopraJargon.words3)
        const quote = `${part0} ${part1} ${part2} ${part3}`

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    fields: [{
                        name: 'Chopra Wisdom',
                        value: quote
                    }]
                }]
            },
        }
    },
}
