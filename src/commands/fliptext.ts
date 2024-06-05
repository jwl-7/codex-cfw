import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'


const CHARS = "!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}"
const CHARS_ALT = "¡#$%⅋,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;>=<¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z]\\\\[^‾,ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz}|{"
const FLIPPED = Object.fromEntries(CHARS.split('').map((char, i) => [char, CHARS_ALT[i]]))


export const FLIPTEXT_COMMAND: ICommand = {
    name: 'fliptext',
    description: 'Flip text upside down/backwards.',
    options: [{
        name: 'text',
        description: '<text>',
        type: InteractionType.MESSAGE_COMPONENT,
        required: true
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const inputText = interaction.data.options?.[0]?.value
        const flippedText = inputText.split('').map((char: string | number) => FLIPPED[char] || char).join('')

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    color: colors.blue,
                    description: flippedText
                }]
            },
        }
    },
}
