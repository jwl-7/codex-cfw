import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { colors } from '@utils/colors'
import { getRandomDiceRoll } from '@utils/random'
import { ICommand, ICommandResponseBody } from 'types'


export const ROLLDICE_COMMAND: ICommand = {
    name: 'dice',
    description: 'Roll 2 dice.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const die1 = getRandomDiceRoll()
        const die2 = getRandomDiceRoll()
        const total = die1 + die2

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    author: {
                        name: 'Dice Roller',
                        icon_url: 'https://i.imgur.com/rkfXx3q.png'
                    },
                    color: colors.blue,
                    fields: [{
                        name: `*${interaction?.member?.user?.global_name}, rolls the dice...*`,
                        value: `**${die1}** and **${die2}** for a total of **${total}**`
                    }]
                }]
            },
        }
    },
}
