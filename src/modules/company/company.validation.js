import joi from 'joi'

export const addCompanyValidation = joi.object({
    companyName: joi.string().trim().required().min(2).max(30),
    description: joi.string().trim().required().min(2).max(2000),
    industry: joi.string().trim().required().min(2).max(2000),
    address: joi.string().trim().required(),
    numberOfEmployees: joi.string().valid('1-10', '11-20', '21-50', '51-100', '101-500', '500+').required(),
    companyEmail: joi.string().email().required()
})



export const updateCompanyValidation = joi.object({
    id: joi.string().length(24).hex().required(),

    companyName: joi.string().trim().min(2).max(30),
    description: joi.string().trim().min(2).max(2000),
    industry: joi.string().trim().min(2).max(2000),
    address: joi.string().trim(),
    numberOfEmployees: joi.string().valid('1-10', '11-20', '21-50', '51-100', '101-500', '500+'),
    companyEmail: joi.string().email()
})