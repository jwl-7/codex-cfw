import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


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
        const response = await fetch(constants.JOKE_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data.joke
    } catch (error) {
        throw new Error(`Failed to fetch joke: ${error}`)
    }
}
