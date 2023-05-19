import { Server } from '@hapi/hapi'
import { getBet, getBets, createBet } from '../controllers/bet'
import methods from './utils/methods'
import { MiddlewaresUser } from './utils/pre'

export const betRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/bet/{id}",
        options: {
            pre: MiddlewaresUser,  
            handler: getBet,
        }
    })

    server.route({
        method: methods.GET,
        path: "/bets",
        options: {
            pre: MiddlewaresUser, 
            handler: getBets,
        }
    })
 
    server.route({
        method: methods.POST,
        path: "/bet",
        options: {
            pre: MiddlewaresUser, 
            handler: createBet,
        }
    })
}