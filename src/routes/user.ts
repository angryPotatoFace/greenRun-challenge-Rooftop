import { Server } from '@hapi/hapi'

import { 
    updateUser, 
    deleteUser,
    depositUser,
    betEvent,
    withDrawUser,
    getTransacions,
    getBalance,
    updateMe
} from '../controllers/user'
import methods from './utils/methods'
import { MiddlewaresUser } from './utils/pre'

export const userRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/user/transactions/",
        options: {
            pre: MiddlewaresUser,  
            handler: getTransacions,
        }
    })

    server.route({
        method: methods.GET,
        path: "/user/balance/{user_id}",
        options: {
            pre: MiddlewaresUser,  
            handler: getBalance,
        }
    })

    // ================================================

    server.route({
        method: methods.POST,
        path: "/user/deposit",
        options: {
            pre: MiddlewaresUser,  
            handler: depositUser,
        }
    })

    server.route({
        method: methods.POST,
        path: "/user/withdraw",
        options: {
            pre: MiddlewaresUser,  
            handler: withDrawUser,
        }
    })

    server.route({
        method: methods.POST,
        path: "/user/bet",
        options: {
            pre: MiddlewaresUser,  
            handler: betEvent,
        }
    })

    // ================================================
    server.route({
        method: methods.PUT,
        path: "/user",
        options: {
            pre: MiddlewaresUser,  
            handler: updateMe,
        }
    })

    // ================================================
    server.route({
        method: methods.DELETE,
        path: "/user/{id}",
        options: {
            pre: MiddlewaresUser,  
            handler: deleteUser,
        }
    })
}