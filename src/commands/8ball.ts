import { InteractionResponseType } from 'discord-interactions'


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


function getRandomResponse(): string {
    return responses[Math.floor(Math.random() * responses.length)]
}


export const EIGHTBALL_COMMAND = {
    name: '8ball',
    description: 'Ask the Magic 8-Ball a question.',
    execute: async () => {
        const fortune = getRandomResponse()
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `🎱 **Magic 8-Ball says:** ${fortune}`,
            },
        }
    },
}
