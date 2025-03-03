import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


const addJob = catchError(async (req, res, next) => {
    let job = new Job(req.body)
    job.addedBy = req.user._id
    await job.save()
    res.json({ message: "success", job })
})

const updateJob = catchError(async (req, res, next) => {
    let job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    job || next(new AppError("job not found", 404))
    !job || res.json({ message: "success", job })
})


const deleteJob = catchError(async (req, res, next) => {
    let job = await Job.findByIdAndDelete(req.params.id)
    job || next(new AppError("job not found", 404))
    !job || res.json({ message: "success", job })
})

const getJob = catchError(async (req, res, next) => {
    let job = await Job.findById(req.params.id)

    job || next(new AppError("job not found", 404))
    !job || res.json({ message: "success", job })
})



const allJobs = catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(Job.find(), req.query)
        .pagination().filter()

    let jobs = await apiFeatures.mongooseQuery
    res.json({ message: "success", page: apiFeatures.pageNumber, jobs })
})


const jopsWithCompaniesInfo = catchError(async (req, res, next) => {
    let jobs = await Job.aggregate([
        { $match: {} }, {
            $lookup: {
                from: "companies",
                foreignField: 'companyHR',
                localField: 'addedBy',
                as: "companies"
            }
        },
        {
            $project: {
                companies: 1, jobTitle: 1, jobLocation: 1,
                workingTime: 1, seniorityLevel: 1, jobDescription: 1,
                technicalSkills: 1, softSkills: 1, addedBy: 1
            }
        }
    ]);
    res.json({ message: "success", jobs })

})

const companiesWithJop = catchError(async (req, res, next) => {
    let company = await Company.aggregate([
        { $match: { companyName: req.query.companyName } }, {
            $lookup: {
                from: "jobs",
                foreignField: 'addedBy',
                localField: 'companyHR',
                as: "jobs"
            }
        },
        { $project: { jobs: 1, companyName: 1 } }
    ]);
    company || next(new AppError("job not found", 404))
    !company || res.json({ message: "success", company })
})






export {
    allJobs,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    jopsWithCompaniesInfo,
    companiesWithJop
}