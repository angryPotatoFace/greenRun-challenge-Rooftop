import Joi from "joi"

export const userSchema = Joi.object({ 
    role: Joi.string().required().valid('user','admin'), 
    firstName: Joi.string().required().regex(RegExp("^[a-zA-Z]+$")), 
    lastName: Joi.string().required(), 
    phone: Joi.string().required(), 
    email: Joi.string().email( {minDomainSegments: 2, tlds: { allow: false } } ).required(), 
    password: Joi.string(),
    username: Joi.string().required(), 
    address: Joi.string().required(), 
    gender: Joi.string().required(), 
    birth_date: Joi.string().required(),
    country_id: Joi.string().required(), 
    city: Joi.string().required(), 
    category: Joi.string().required(), 
    document_id: Joi.string().required(), 
    user_state: Joi.string().required().valid('allow','block'),
})

export const userSchemaID = Joi.object({ 
    id: Joi.string().required(),
    role: Joi.string().required().valid('user','administrator'), 
    firstName: Joi.string().required().regex(RegExp("^[a-zA-Z]+$")), 
    lastName: Joi.string().required(), 
    phone: Joi.string().required(), 
    email: Joi.string().email( { minDomainSegments: 2, tlds: { allow: false } } ).required(), 
    username: Joi.string().required(), 
    address: Joi.string().required(), 
    gender: Joi.string().required(), 
    birth_date: Joi.string().required(),
    country_id: Joi.string().required(), 
    city: Joi.string().required(), 
    category: Joi.string().required(), 
    document_id: Joi.string().required(), 
    user_state: Joi.string().required().valid('allow','block'),
})