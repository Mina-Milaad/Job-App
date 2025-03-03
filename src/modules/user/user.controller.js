import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";




const updateUser = catchError(async (req, res, next) => {
    let user = await User.findOneAndUpdate({ _id: req.user._id, status: "online" }, req.body, { new: true })
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})

const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findOneAndDelete({ _id: req.user._id, status: "online" })
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})


const getUser = catchError(async (req, res, next) => {
    res.status(200).json(req.user)
    // let user = await User.findOne({ _id: req.user._id, status: "online" })
    // user || next(new AppError("user not found", 404))
    // !user || res.json({ message: "success", user })
})

const getUserProfile = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})

const GetAllAccountsRecoveryEmail = catchError(async (req, res, next) => {
    let user = await User.find({ recoveryEmail: req.body.recoveryEmail })
    user || next(new AppError("user not found", 404))
    !user || res.json({ message: "success", user })
})

export {
    updateUser,
    deleteUser,
    getUser,
    getUserProfile,
    GetAllAccountsRecoveryEmail
}