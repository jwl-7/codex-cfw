import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


export const DEFINE_COMMAND: ICommand = {
    name: 'define',
    description: 'Search Merriam-Webster dictionary.',
    options: [{
        name: 'word',
        description: '<word>',
        type: InteractionType.MESSAGE_COMPONENT,
        required: true
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const inputText = interaction.data.options?.[0]?.value
        const wordData = await getWordData(inputText)
        const link = `${constants.MERRIAM_WEBSTER_URL}${encodeURIComponent(inputText)}`
        let embed = {
            color: colors.blue,
            author: {
                name: 'Merriam-Webster Dictionary',
                icon_url: constants.MERRIAM_WEBSTER_ICON_URL
            }
        }

        if (!wordData) {
            embed.description = `No definition found for ${inputText}`
        } else {
            const data = wordData[0]
            const word = data.meta.id
            const pronunciation = data.hwi.prs[0].mw
            const wordType = data.fl
            const definition = data.shortdef[0]

            embed.fields = [{
                    name: `**${word}**`,
                    value: `${pronunciation}`
                }, {
                    name: `**${wordType}**`,
                    value: definition
                }, {
                    name: `**Link**`,
                    value: link
            }]
        }

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [embed]
            },
        }
    },
}

async function getWordData(word: string): Promise<object> {
    const url = (
        constants.MERRIAM_WEBSTER_API_URL +
        encodeURIComponent(word) +
        `?key=${encodeURIComponent(constants.MERRIAM_WEBSTER_API_TOKEN)}`
    )

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        throw new Error(`Failed to fetch definition: ${error}`)
    }
}
