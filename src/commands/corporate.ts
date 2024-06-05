import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { corporateJargon } from '@/jargon/corporate'


export const CORPORATE_COMMAND: ICommand = {
    name: 'corporate',
    description: 'Generate corporate bulls**t statement.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const adverb = getRandomElement(corporateJargon.adverbs)
        const verb = getRandomElement(corporateJargon.verbs)
        const adjective = getRandomElement(corporateJargon.adjectives)
        const noun = getRandomElement(corporateJargon.nouns)
        const statement = `${adverb} ${verb} ${adjective} ${noun}`

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    fields: [{
                        name: 'Corporate Bullshit',
                        value: statement
                    }]
                }]
            },
        }
    },
}
