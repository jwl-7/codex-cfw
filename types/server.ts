import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { IRequest, RequestLike } from 'itty-router'


export interface IEnv {
    DISCORD_APPLICATION_ID?: string
    DISCORD_PUBLIC_KEY?: string
    DISCORD_TOKEN?: string
}

export interface IServer {
    verifyDiscordRequest: (request: IRequest, env: IEnv) => Promise<{
        interaction?: APIApplicationCommandInteraction
        isValid: boolean
    }>,
    fetch: <A>(request: RequestLike, ...extra: A[]) => Promise<Response>
}
