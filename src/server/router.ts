import { RouterType } from 'itty-router'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { commands } from '@/commands'
import { IServer, JsonResponse } from '@/utils/requests'


export function setupRouter(server: IServer, router: RouterType): void {
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
                    const response = await command.run()
                    return new JsonResponse(response)
                } catch (error) {
                    console.error('Error running command:', error)
                    return new JsonResponse({ error: 'Command failed' }, { status: 500 })
                }
            }
        }

        console.error('Unknown Type')
        return new JsonResponse({ error: 'Unknown Type' }, { status: 400 })
    })

    router.all('*', () => {
        return new Response('Not Found.', { status: 404 })
    })
}
