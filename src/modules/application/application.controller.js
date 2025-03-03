import { Application } from "../../../database/models/application.model.js";
import { catchError } from "../../middleware/catchError.js";



const addApplication = catchError(async (req, res, next) => {
    req.body.userId = req.user._id
    req.body.userResume = req.file.filename
    let application = new Application(req.body)
    await application.save()
    res.json({ message: "success", application })
})

export {
    addApplication
}