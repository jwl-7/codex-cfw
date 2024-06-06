import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/random'
import { constants } from '@/utils/constants'


const EMOJIS = ['apple', 'cherries', 'doughnut', 'grapes', 'taco', 'watermelon']
const JACKPOT = '$$$ !!! JACKPOT !!! $$$'
const JACKSHIT = '(◕‿◕)╭∩╮ YOU GET NOTHING !!!'


export const SLOTS_COMMAND: ICommand = {
    name: 'slots',
    description: 'Play fruit emojis slot machine.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const slots = [
            getRandomElement(EMOJIS),
            getRandomElement(EMOJIS),
            getRandomElement(EMOJIS),
            getRandomElement(EMOJIS)
        ]
        const spin = `|\t:${slots[0]}:\t|\t:${slots[1]}:\t|\t:${slots[2]}:\t|\t:${slots[3]}:\t|`
        const isJackpot =
            slots[0] == slots[1] && slots[2] == slots[3] ||
            slots[0] == slots[2] && slots[1] == slots[3] ||
            slots[0] == slots[3] && slots[1] == slots[2]


        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    author: {
                        name: 'Slot Machine',
                        icon_url: constants.SLOTS_ICON_URL
                    },
                    color: colors.blue,
                    fields: [{
                        name: `*${interaction?.member?.user?.global_name}, pulls the slot machine handle...*`,
                        value: spin
                    }],
                    footer: {
                        text: isJackpot ? JACKPOT : JACKSHIT
                    }
                }]
            },
        }
    },
}
