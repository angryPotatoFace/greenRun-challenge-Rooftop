import { Request} from '@hapi/hapi'

export interface IUser {
    id?: string,
    role: string, 
    firstName: string, 
    lastName: string,
    phone: string, 
    email: string,
    password?: string, 
    username: string, 
    address: string, 
    gender: string, 
    birth_date: string,   
    country_id: string, 
    city: string, 
    category: string, 
    document_id: string, 
    user_state: string
}


export interface ITransaction {
    user_id: string, 
    amount: number, 
    category?: string, 
    status: string, 
    user_bet_id?: number
}

export interface IRequestTransactions extends Request {
    payload: ITransaction
}

export interface IRequestUser extends Request {
    params: {
        id?: string,
        filters?: string
    }
    payload: IUser
}


export interface IBetEvent {
    event_id: number,
    bet_option: number,
    user_id: number, 
    amount: number, 
    category: string, 
    status: string, 
    user_bet_id: number
}

export interface IBet {
    bet_option: number,
    sport: string,
    status: string,
    name: string,
    event_id: number,
    odd: number,
    result: string,
}

export interface ICreateBet extends Request {
    payload: IBet
}

export interface IChangeBetStatus extends Request {
    payload: {
        id: number,
        status: string,
    }
}

export interface IRequestBet extends Request {
    payload:{
        bet: {
            event_id: number
            bet_option: number
        },
        transaction: {
            user_id: string, 
            amount: number,
            category: string,
            status: string, 
            user_bet_id?: number
        }
    }
}


export interface IUserBet {
    user_id: string,
    bet_id: number,
    odd: number,
    amount: number,
    state: string,
}


export interface IAuthLogin extends Request {
    payload: {
        email: string,
        password: string,
    }
}
