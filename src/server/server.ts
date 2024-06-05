import { RouterType } from 'itty-router'
import { verifyDiscordRequest } from '@utils/requests'
import { IServer } from 'types'


export function setupServer(server: IServer, router: RouterType): void {
    server.verifyDiscordRequest = verifyDiscordRequest
    server.fetch = router.fetch
}
