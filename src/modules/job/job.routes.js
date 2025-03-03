import { Router } from "express";
import { addJob, allJobs, companiesWithJop, deleteJob, getJob, jopsWithCompaniesInfo, updateJob } from "./job.controller.js";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addJobValidation, updateJobValidation } from "./job.validation.js";

const jobRouter = Router({ mergeParams: true })

jobRouter.route('/')
    .get(allJobs)
    .post(protectedRoutes, allowoedTo('Company_HR'), validate(addJobValidation), addJob)

jobRouter.route('/companiesinfo')
    .get(protectedRoutes, allowoedTo('Company_HR', 'User'), jopsWithCompaniesInfo)

jobRouter.route('/jobsinfo')
    .get(protectedRoutes, allowoedTo('Company_HR', 'User'), companiesWithJop)

jobRouter.route('/:id')
    .get(getJob)
    .put(protectedRoutes, allowoedTo('Company_HR'), validate(updateJobValidation), updateJob)
    .delete(protectedRoutes, allowoedTo('Company_HR'), deleteJob)


export default jobRouter