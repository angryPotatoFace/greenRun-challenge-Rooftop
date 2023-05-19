import { User } from "../models/entity/User"
import { IUser } from "../constants/interfaces"
import { ERROR_BLOCKING, ERR_ID } from "../constants/errors"
import { Roles, State } from '../constants/User'

export const insertUser = async ( user:IUser ) => {
    try {
        return await User.insert(user)
    } catch (error) {
        throw error  
    }
}

export const findAllUsers = async () => {
    try {
        return await User.find()
    } catch (error) {
        throw error  
    }
}

export const findUserBy = async ( condition:any ): Promise<User> => {
    try {
        const user = await User.findOneBy( condition )
        return user! ;
    } catch (error) {
        throw error  
    }
}

export const updateDataUser = async( user: IUser) => {
    try {
        if( !user.id ) return ERR_ID

        return await User.update(
            user.id,
            user
        )
    } catch (error) {
        throw error  
    }
}

export const deleteUserByID = async( user: IUser) => {
    try {
        if( !user.id ) return ERR_ID

        return await User.update(
            user.id,
            user
        )
    } catch (error) {
        throw error  
    }
}


export const blockAUser = async( id: string ) => {
    try {

        const isAdmin = await isAdmintrator(id);
        if ( isAdmin ) throw Error(ERROR_BLOCKING)

        const data = await User.update(id,{
            user_state: State.BLOCK
        })    

        return data;
    } catch (error) {
        throw error  
    }
}


export const isAdmintrator = async( id: string ) => {
    try {
        const data = await User.findOneBy({ id });

        return ( data?.role === Roles.ADMIN);
    } catch (error) {
        throw error  
    }
}