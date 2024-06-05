import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


const URL = 'https://official-joke-api.appspot.com/jokes/programming/random'
const ERROR_MESSAGE = 'Error fetching joke.'


export const CSJOKE_COMMAND: ICommand = {
    name: 'csjoke',
    description: 'Random programming joke.',
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
        return `${data[0].setup}\n${data[0].punchline}`
    } catch (error) {
        return ERROR_MESSAGE
    }
}
