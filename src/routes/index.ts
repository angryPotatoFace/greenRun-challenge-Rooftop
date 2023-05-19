import { Server } from '@hapi/hapi'
import { userRoutes } from './user'
import { betRoutes } from './bet'
import { authRoutes } from './auth'
import { adminRoutes } from './admin'

export const routes = ( server: Server ) => {
    userRoutes(server)
    betRoutes(server)
    authRoutes(server)
    adminRoutes(server)
} 