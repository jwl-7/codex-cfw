import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { constants } from '@/utils/constants'


const FACES = ['Heads', 'Tails']


export const FLIPCOIN_COMMAND: ICommand = {
    name: 'coin',
    description: 'Flip a coin.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    author: {
                        name: 'Coin Flip',
                        icon_url: constants.FLIPCOIN_ICON_URL
                    },
                    color: colors.blue,
                    fields: [{
                        name: `*${interaction?.member?.user?.global_name}, the coin lands...*`,
                        value: `**${getRandomElement(FACES)}**`
                    }]
                }]
            },
        }
    },
}
