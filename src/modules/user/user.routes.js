import { Router } from "express";
import { allowoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { GetAllAccountsRecoveryEmail, deleteUser, getUser, getUserProfile, updateUser } from "./user.controller.js";
import { emailExist, mobileExist } from "../../middleware/checkEmailOrMobileExist.js";
import { validate } from "../../middleware/validate.js";
import { updateUserValidation } from "./user.validation.js";

const userRouter = Router()

userRouter.route('/')
    .put(protectedRoutes, allowoedTo('User', 'Company_HR'), emailExist, mobileExist, validate(updateUserValidation), updateUser)
    .delete(protectedRoutes, allowoedTo('User'), deleteUser)
    .get(protectedRoutes, allowoedTo('User'), getUser)
userRouter.route('/:id')
    .get(getUserProfile)

userRouter.route('/recoveryemail')
    .get(GetAllAccountsRecoveryEmail)

export default userRouter