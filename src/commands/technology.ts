import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { techJargon } from '@jargon/technology'


export const TECHNOLOGY_COMMAND: ICommand = {
    name: 'technology',
    description: 'Generate hollywood tech jargon.',
    run: async (_interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const words = [
            getRandomElement(techJargon.words0),
            getRandomElement(techJargon.words1),
            getRandomElement(techJargon.words2),
            getRandomElement(techJargon.words3),
            getRandomElement(techJargon.words4)
        ]
        let sentence = getRandomElement(techJargon.sentences)

        for (let x = 0; x < 5; x++) {
            const placeholder = `{${x}}`
            const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
            sentence = sentence.replace(regex, words[x])
        }


        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    fields: [{
                        name: 'Tech jargon',
                        value: sentence
                    }]
                }]
            },
        }
    },
}
