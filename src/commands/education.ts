import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { educationJargon } from '@/jargon/education'


export const EDUCATION_COMMAND: ICommand = {
    name: 'education',
    description: 'Generate educational nonsense.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const verb = getRandomElement(educationJargon.verbs)
        const adjective = getRandomElement(educationJargon.adjectives)
        const noun = getRandomElement(educationJargon.nouns)
        const phrase = getRandomElement(educationJargon.phrases)
        const statement = `We will ${verb} ${adjective} ${noun} ${phrase}.`

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    fields: [{
                        name: 'Educational Nonsense',
                        value: statement
                    }]
                }]
            },
        }
    },
}
