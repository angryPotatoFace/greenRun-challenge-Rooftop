import Joi from "joi"

export const transactionSchema = Joi.object({ 
    user_id: Joi.string().required(), 
    amount: Joi.number().required().min(0).max(10000),
    category: Joi.string().required().valid('deposit','withdraw','bet','winning'),
    status: Joi.string().required()
})

export const userBetSchema = Joi.object({ 
    user_id: Joi.string().required(), 
    amount: Joi.number().required().min(0).max(10000),
    category: Joi.string().required().valid('deposit','withdraw', 'bet', 'winning'),
    status: Joi.string().required()
})