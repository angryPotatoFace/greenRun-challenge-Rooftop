import Joi from "joi";


export const betSchema = Joi.object({ 
    "bet_option": Joi.number(), 
    "sport": Joi.string(), 
    "name": Joi.string(), 
    "event_id": Joi.number(), 
    "odd": Joi.number(),
})



export const doAbetSchema = Joi.object({ 
    "event_id": Joi.number(), 
    "bet_option": Joi.number(),
    "amount": Joi.number(), 
    "user_id": Joi.string(), 
    "category": Joi.string(), 
    "status": Joi.string(),
})