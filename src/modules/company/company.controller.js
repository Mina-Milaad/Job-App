import mongoose from "mongoose";
import { Application } from "../../../database/models/application.model.js";
import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/appError.js";




const addCompany = catchError(async (req, res, next) => {
    let company = new Company(req.body)
    company.companyHR = req.user._id
    await company.save()
    res.json({ message: "success", company })
})

const updateCompany = catchError(async (req, res, next) => {
    let company = await Company.findOneAndUpdate({ _id: req.params.id, companyHR: req.user._id }, req.body, { new: true })
    company || next(new AppError("company not found", 404))
    !company || res.json({ message: "success", company })
})

const deleteCompany = catchError(async (req, res, next) => {
    let company = await Company.findOneAndDelete({ _id: req.params.id, companyHR: req.user._id })
    company || next(new AppError("company not found", 404))
    !company || res.json({ message: "success", company })
})

const getCompany = catchError(async (req, res, next) => {
    let company = await Company.findOne({ _id: req.params.id })
    company || next(new AppError("company not found", 404))
    !company || res.json({ message: "success", company })
})

const allCompanies = catchError(async (req, res, next) => {

    let apiFeatures = new ApiFeatures(Company.find(), req.query)
        .pagination().fields().filter().sort().search()

    let companies = await apiFeatures.mongooseQuery
    res.json({ message: "success", page: apiFeatures.pageNumber, companies })
})


const getApplicationsForJob = catchError(async (req, res, next) => {
    let job = await Job.findOne({ _id: req.params.id, addedBy: req.user._id })
    job || next(new AppError("jobsss not found", 404))
    !job || res.json({ message: "success", job })
})

const companiesWithJopByID = catchError(async (req, res, next) => {
    let company = await Company.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } }, {
            $lookup: {
                from: "jobs",
                foreignField: 'addedBy',
                localField: 'companyHR',
                as: "jobs"
            }
        },
        { $project: { jobs: 1, companyName: 1 } }
    ]);
    company || next(new AppError("company not found", 404))
    !company || res.json({ message: "success", company })
})


export {
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    allCompanies,
    getApplicationsForJob,
    companiesWithJopByID
}