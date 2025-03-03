import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addApplication } from "./application.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addApplicationValidation } from "./application.validation.js";



const applicationRouter = Router()

applicationRouter.route('/')
    .post(protectedRoutes, allowoedTo('User'), uploadSingleFile("userResume", "applications"), validate(addApplicationValidation), addApplication)


export default applicationRouter