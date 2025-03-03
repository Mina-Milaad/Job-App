import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCompany, allCompanies, companiesWithJopByID, deleteCompany, getApplicationsForJob, getCompany, updateCompany } from "./company.controller.js";
import jobRouter from "../job/job.routes.js";
import { validate } from "../../middleware/validate.js";
import { addCompanyValidation, updateCompanyValidation } from "./company.validation.js";

const companyRouter = Router()


// companyRouter.use('/:company/jobs', jobRouter)

companyRouter.route('/')
    .post(protectedRoutes, allowoedTo('Company_HR'), validate(addCompanyValidation), addCompany)
    .get(protectedRoutes, allowoedTo('Company_HR', 'User'), allCompanies)



companyRouter.route('/:id')
    .put(protectedRoutes, allowoedTo('Company_HR'), validate(updateCompanyValidation), updateCompany)
    .delete(protectedRoutes, allowoedTo('Company_HR'), deleteCompany)
    .get(protectedRoutes, allowoedTo('Company_HR'), getCompany)
companyRouter.route("/application/:id").get(protectedRoutes, allowoedTo('Company_HR'), getApplicationsForJob)
companyRouter.route("/jobsofcompanies/:id").get(protectedRoutes, allowoedTo('Company_HR'), companiesWithJopByID)





export default companyRouter