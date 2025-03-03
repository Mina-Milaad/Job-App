import Joi from 'joi';

export const signupValidation = Joi.object({
    firstName: Joi.string().trim().min(1).required(),
    lastName: Joi.string().trim().min(1).required(),
    userName: Joi.string().trim().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    recoveryEmail: Joi.string().email().optional(),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string().pattern(/^\+?[0-9]{7,15}$/).required(),
});

export const signinValidation = Joi.object({
    identifier: Joi.alternatives().try(
        Joi.string().email().message('Invalid email format'),
        Joi.string().pattern(/^\+?[0-9]{10,15}$/).message('Invalid mobile number format'),
        Joi.string().email().message('Invalid recovery email format')
    ).required(),
    password: Joi.string().min(8).required(),
});

export const changeUserPasswordValidation = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
    rePassword: Joi.string().valid(Joi.ref('newPassword')).required()
});