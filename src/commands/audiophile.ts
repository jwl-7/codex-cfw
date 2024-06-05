import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { audioJargon } from '@/jargon/audio'


export const AUDIOPHILE_COMMAND: ICommand = {
    name: 'audiophile',
    description: 'Generate hipster audio jargon.',
    run: async (_: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const words = [
            getRandomElement(audioJargon.words0),
            getRandomElement(audioJargon.words1),
            getRandomElement(audioJargon.words2),
            getRandomElement(audioJargon.words3),
            getRandomElement(audioJargon.words4)
        ]
        let sentence = getRandomElement(audioJargon.sentences)

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
                        name: 'Audio Jargon',
                        value: sentence
                    }]
                }]
            },
        }
    },
}
