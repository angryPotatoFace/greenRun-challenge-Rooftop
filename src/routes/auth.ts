import { Server } from '@hapi/hapi'
import methods from './utils/methods'
import { loginUser, registerUser } from '../controllers/auth'

export const authRoutes = (server: Server) => {

    server.route({
        method: methods.POST,
        path: "/login",
        handler: loginUser
    })

    server.route({
        method: methods.POST,
        path: "/register",
        handler:  registerUser
    })
}