import Joi from 'joi'



export const updateUserValidation = Joi.object({
    firstName: Joi.string().trim().min(1),
    lastName: Joi.string().trim().min(1),
    userName: Joi.string().trim().min(1),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    recoveryEmail: Joi.string().email().optional(),
    DOB: Joi.date(),
    mobileNumber: Joi.string().pattern(/^\+?[0-9]{7,15}$/),
});