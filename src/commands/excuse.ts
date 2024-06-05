import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { excuseJargon } from '@/jargon/excuses'


export const EXCUSE_COMMAND: ICommand = {
    name: 'excuse',
    description: 'Generate the perfect excuse.',
    run: async (_: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const words = [
            getRandomElement(excuseJargon.words0),
            getRandomElement(excuseJargon.words1),
            getRandomElement(excuseJargon.words2),
            getRandomElement(excuseJargon.words3),
            getRandomElement(excuseJargon.words4)
        ]
        let sentence = getRandomElement(excuseJargon.sentences)

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
                        name: 'Perfect Excuse',
                        value: sentence
                    }]
                }]
            },
        }
    },
}
