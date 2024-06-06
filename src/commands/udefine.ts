import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { ICommand, ICommandResponseBody } from 'types'
import { colors } from '@utils/colors'
import { constants } from '@/utils/constants'


export const UDEFINE_COMMAND: ICommand = {
    name: 'udefine',
    description: 'Search Urban Dictionary.',
    options: [{
        name: 'word',
        description: '<word>',
        type: InteractionType.MESSAGE_COMPONENT,
        required: false
    }],
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const inputText = interaction.data.options?.[0]?.value
        const wordData = inputText
            ? await getWordData(inputText)
            : await getRandomWordData()
        const embed = {
            color: colors.orange,
            author: {
                name: 'Urban Dictionary',
                icon_url: constants.URBAN_DICTIONARY_ICON_URL
            }
        }

        if (!wordData) {
            embed.description = `No definition found for ${inputText}`
        } else {
            const data = wordData.list[0]
            const word = data.word
            const definition = data.definition
            const example = data.example
            const link = data.permalink

            embed.fields = [{
                    name: `**${word}**`,
                    value: definition
                }, {
                    name: `**Example**`,
                    value: example
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
    const url = `${constants.URBAN_DICTIONARY_API_URL}${encodeURIComponent(word)}`

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

async function getRandomWordData(): Promise<object> {
    try {
        const response = await fetch(constants.URBAN_DICTIONARY_API_RANDOM_URL, {
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
