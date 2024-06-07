import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


export const DOG_COMMAND: ICommand = {
    name: 'dog',
    description: 'Random doggo image.',
    run: async (_interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.darkerGrey,
                    image: {
                        url: await getDog()
                    }
                }]
            },
        }
    },
}

async function getDog(): Promise<string> {
    try {
        const response = await fetch(constants.DOG_API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        return data.message
    } catch (error) {
        throw new Error(`Failed to fetch doggo: ${error}`)
    }
}
