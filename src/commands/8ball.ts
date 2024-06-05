import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { InteractionResponseType } from 'discord-interactions'
import { colors } from '@utils/colors'
import { getRandomElement } from '@utils/utils'
import { ICommand, ICommandResponseBody } from 'types'


const responses = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Do not count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
]


export const EIGHTBALL_COMMAND: ICommand = {
    name: '8ball',
    description: 'Ask the Magic 8-Ball a question.',
    run: async (interaction: APIApplicationCommandInteraction): Promise<ICommandResponseBody> => {
        const fortune = getRandomElement(responses)

        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    author: {
                        name: 'Magic 8-ball',
                        icon_url: 'https://i.imgur.com/XhNqADi.png'
                    },
                    color: colors.purple,
                    fields: [{
                        name: `*${interaction?.member?.user?.username}, your fortune says...*`,
                        value: `**${fortune}**`
                    }]
                }]
            },
        }
    },
}
