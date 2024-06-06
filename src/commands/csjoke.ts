import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


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
        const response = await fetch(constants.CS_JOKE_API_URL, {
            headers: {
                method: 'GET',
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return `${data[0].setup}\n${data[0].punchline}`
    } catch (error) {
        throw new Error(`Failed to fetch joke: ${error}`)
    }
}
