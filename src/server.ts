import { IRequest, Router } from 'itty-router'
import { InteractionType, InteractionResponseType, verifyKey } from 'discord-interactions'
import { commands } from '@/commands'


export interface IEnv {
    DISCORD_APPLICATION_ID?: string
    DISCORD_PUBLIC_KEY?: string
    DISCORD_TOKEN?: string
}

const router = Router()

export const server = {
    verifyDiscordRequest: verifyDiscordRequest,
    fetch: router.fetch
}


class JsonResponse extends Response {
    constructor(body: object, init?: ResponseInit) {
        const jsonBody = JSON.stringify(body)
        init = init || {
            headers: {
                'content-type': 'application/jsoncharset=UTF-8',
            },
        }
        super(jsonBody, init)
    }
}

async function verifyDiscordRequest(request: IRequest, env: IEnv) {
    const signature = request.headers.get('x-signature-ed25519')
    const timestamp = request.headers.get('x-signature-timestamp')
    const body = await request.text()
    const isValidRequest =
        signature &&
        timestamp &&
        verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY ?? '')

    return isValidRequest
        ? { interaction: JSON.parse(body), isValid: true }
        : { isValid: false }
}

router.get('/', (_request, env) => {
    return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`)
})

router.post('/', async (request, env) => {
    const { isValid, interaction } = await server.verifyDiscordRequest(request, env)

    if (!isValid || !interaction) {
        return new Response('Bad request signature.', { status: 401 })
    }

    if (interaction.type === InteractionType.PING) {
        return new JsonResponse({ type: InteractionResponseType.PONG })
    }

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        const command = commands[interaction.data.name.toLowerCase()]

        if (command) {
            try {
                const response = await command.execute()
                return new JsonResponse(response)
            } catch (error) {
                console.error('Command execution error:', error)
                return new JsonResponse({ error: 'Command execution failed' }, { status: 500 })
            }
        }
    }

    console.error('Unknown Type')
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 })
})

router.all('*', () => new Response('Not Found.', { status: 404 }))
