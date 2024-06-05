import { APIInteraction } from 'discord-api-types/v10';
import { IRequest } from 'itty-router'
import { verifyKey } from 'discord-interactions'
import { IEnv } from 'types'


export class JsonResponse<T> extends Response {
    constructor(body: T, init?: ResponseInit) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        };
        super(jsonBody, init);
    }
}

export async function verifyDiscordRequest(
    request: IRequest,
    env: IEnv
): Promise<{
    interaction?: APIInteraction
    isValid: boolean
}> {
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
