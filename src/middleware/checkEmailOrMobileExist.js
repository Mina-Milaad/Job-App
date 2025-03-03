import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"



export const emailExist = async (req, res, next) => {
    let isFound = await User.findOne({ email: req.body.email, _id: { $ne: req.user._id } })
    if (isFound) return next(new AppError('email is exist', 409))

    next()

}

export const mobileExist = async (req, res, next) => {
    let isFound = await User.findOne({ mobileNumber: req.body.mobileNumber, _id: { $ne: req.user._id } })
    if (isFound) return next(new AppError('phone is exist', 409))

    next()

}