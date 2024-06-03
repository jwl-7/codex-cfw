import { IRequest, RequestLike } from 'itty-router'
import { verifyKey } from 'discord-interactions'


export interface IEnv {
    DISCORD_APPLICATION_ID?: string
    DISCORD_PUBLIC_KEY?: string
    DISCORD_TOKEN?: string
}

export interface IServer {
    verifyDiscordRequest: typeof verifyDiscordRequest,
    fetch: <A>(request: RequestLike, ...extra: A[]) => Promise<Response>
}

export class JsonResponse extends Response {
    constructor(body: object, init?: ResponseInit) {
        const jsonBody = JSON.stringify(body)
        init = init || {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        }
        super(jsonBody, init)
    }
}

export async function verifyDiscordRequest(request: IRequest, env: IEnv) {
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
