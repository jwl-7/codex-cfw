import { verifyKey } from 'discord-interactions'


export class JsonResponse extends Response {
    constructor(body: any, init?: ResponseInit) {
        const jsonBody = JSON.stringify(body)
        init = init || {
            headers: {
                'content-type': 'application/jsoncharset=UTF-8',
            },
        }
        super(jsonBody, init)
    }
}


export async function verifyDiscordRequest(request: Request, env: any) {
    const signature = request.headers.get('x-signature-ed25519')
    const timestamp = request.headers.get('x-signature-timestamp')
    const body = await request.text()
    const isValidRequest =
        signature &&
        timestamp &&
        verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY)

    return isValidRequest
        ? { interaction: JSON.parse(body), isValid: true }
        : { isValid: false }
}
