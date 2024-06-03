import { RouterType } from 'itty-router'
import { IServer, verifyDiscordRequest } from '@/utils/requests'


export function setupServer(server: IServer, router: RouterType): void {
    server.verifyDiscordRequest = verifyDiscordRequest
    server.fetch = router.fetch
}
