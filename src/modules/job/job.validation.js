import joi from 'joi'

export const addJobValidation = joi.object({
    jobTitle: joi.string().trim().required().min(2).max(30),
    jobLocation: joi.string().valid("onsite", "remotely", "hybrid").required(),
    workingTime: joi.string().valid("part-time", "full-time").required(),
    seniorityLevel: joi.string().valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO").required(),
    jobDescription: joi.string().trim().required().min(2).max(100),
    technicalSkills: joi.array().items(joi.string().trim()).required(),
    softSkills: joi.array().items(joi.string().trim()).required(),
})



export const updateJobValidation = joi.object({
    id: joi.string().length(24).hex().required(),

    jobTitle: joi.string().trim().required().min(2).max(30),
    jobLocation: joi.string().valid("onsite", "remotely", "hybrid"),
    workingTime: joi.string().valid("part-time", "full-time"),
    seniorityLevel: joi.string().valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
    jobDescription: joi.string().trim().min(2).max(100),
    technicalSkills: joi.array().items(joi.string().trim()),
    softSkills: joi.array().items(joi.string().trim()),
})