import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { allowoedTo, changeUserPassword, protectedRoutes, signin, signup } from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { changeUserPasswordValidation, signinValidation, signupValidation } from "./auth.validation.js";



const authRouter = Router()


authRouter.post('/signup', validate(signupValidation), checkEmail, signup)
authRouter.post('/signin', validate(signinValidation), signin)
authRouter.patch('/changePassword', protectedRoutes, allowoedTo('User', 'Company_HR'), validate(changeUserPasswordValidation), changeUserPassword)



export default authRouter