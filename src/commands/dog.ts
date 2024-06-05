import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


const URL = 'https://dog.ceo/api/breeds/image/random'
const ERROR_MESSAGE = 'Error fetching doggo.'


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
        const response = await fetch(URL, {
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error(ERROR_MESSAGE)
        const data = await response.json()
        return data.message
    } catch (error) {
        throw new Error(ERROR_MESSAGEQ)
    }
}
