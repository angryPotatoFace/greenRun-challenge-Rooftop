import { Server } from '@hapi/hapi'
import { changeStatus, getBets, uploadResult } from '../controllers/bet'
import { getTransactions } from '../controllers/transactions'
import { blockUser, updateUser } from '../controllers/user'
import { MiddlewaresAdministrator } from './utils/pre'
import methods from './utils/methods'

export const adminRoutes = (server: Server) => {

    server.route({
        method: methods.GET,
        path: "/admin/listBets",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: getBets,
        }
    })

    server.route({
        method: methods.GET,
        path: "/admin/listTransactions",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: getTransactions,
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/changeBetStatus",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: changeStatus,
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/blockUser",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: blockUser,
        }
    })

    server.route({
        method: methods.POST,
        path: "/admin/resultOfBet",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: uploadResult,
        }
    })


    server.route({
        method: methods.PUT,
        path: "/admin/updateUser",
        options: {
            pre: MiddlewaresAdministrator,  
            handler: updateUser,
        }
    })


    // TODO: ACTUALIZAR INFORMACION.

}