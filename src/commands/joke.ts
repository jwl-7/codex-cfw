import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


const URL = 'https://icanhazdadjoke.com/'
const ERROR_MESSAGE = 'Error fetching joke.'


export const JOKE_COMMAND: ICommand = {
    name: 'joke',
    description: 'Random dad joke.',
    run: async (_interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.darkerGrey,
                    description: await getJoke()
                }]
            },
        }
    },
}

async function getJoke(): Promise<string> {
    try {
        const response = await fetch(URL, {
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) return ERROR_MESSAGE
        const data = await response.json()
        return data.joke
    } catch (error) {
        return ERROR_MESSAGE
    }
}
