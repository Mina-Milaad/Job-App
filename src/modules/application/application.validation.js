import joi from 'joi'

export const addApplicationValidation = joi.object({
    jobId: joi.string().hex().length(24).required(),
    userTechSkills: joi.array().items(joi.string().trim()).required(),
    userSoftSkills: joi.array().items(joi.string().trim()).required(),
    userResume: joi
        .object({
            fieldname: joi.string().required(),
            originalname: joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().valid("application/pdf").required(),
            destination: joi.string().required(),
            filename: joi.string().required(),
            path: joi.string().required(),
            size: joi.number().max(5242880).required(),
        }).required(),

})