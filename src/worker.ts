import { Router } from 'itty-router'
import { setupServer } from '@server/server'
import { setupRouter } from '@server/router'
import { IServer } from '@utils/requests'


const router = Router()
let server = {} as IServer

setupServer(server, router)
setupRouter(server, router)


export default server
