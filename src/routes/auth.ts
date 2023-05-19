import { Server } from '@hapi/hapi'
import methods from './utils/methods'
import { loginUser, registerUser } from '../controllers/auth'
import Joi from 'joi'
import { userSchema } from '../models/schemas/userSchema'

export const authRoutes = (server: Server) => {

    server.route({
        method: methods.POST,
        path: "/login",
        options: {
            handler: loginUser,
            description: 'Login User',
            notes: 'Check If have a registered user and return a beared token',
            tags: ['api'], // ADD THIS TAG
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returns the Bearer Token'
                        } 
                    },
                }
            },
            validate: {
                payload: Joi.object({
                    'email': Joi.string(),
                    'password': Joi.string(),
                }),
            },
        }
    })

    server.route({
        method: methods.POST,
        path: "/register",
        options: {
            handler:  registerUser,
            description: 'Register User',
            notes: 'Register a user save it in the datebase',
            tags: ['api'], // ADD THIS TAG
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returns the userid',
                        } 
                    },
                }
            },
            validate: {
                payload: userSchema
            },
        }
     
    })
}