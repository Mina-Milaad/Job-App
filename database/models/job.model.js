import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
    jobTitle: {
        type: String,
        minlength: [2, "too short jobTitle"],
        maxlength: [50, "too long jobTitle"],
        required: true
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotely", "hybrid"],
        required: true
    },
    workingTime: {
        type: String,
        enum: ["part-time", "full-time"],
        required: true
    },
    seniorityLevel: {
        type: String,
        enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: [String],
        required: true
    },
    softSkills: {
        type: [String],
        required: true
    },
    addedBy: {
        type: Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, versionKey: false, toJSON: { virtuals: true }, id: false })


schema.virtual("applications", {
    ref: "Application",
    localField: "_id",
    foreignField: "jobId"
})



schema.pre("findOne", function () {
    this.populate('applications')
})

export const Job = mongoose.model('Job', schema)



// schema.pre("find", function () {
//     this.populate('companies')
// })




// schema.virtual("companies", {
//     ref: "Company",
//     localField: "addedBy",
//     foreignField: "companyHR"
// })


//, toJSON: { virtuals: true },toObject: { virtuals: true }
/*
schema.virtual("applications", {
    ref: "Application",
    localField: "_id",
    foreignField: "jobId"
})

schema.virtual("company", {
    ref: "Company",
    localField: "addedBy",
    foreignField: "companyHR"
})

schema.pre(/^find/, function () {
    this.populate("company")
})

schema.pre(/^find/, function () {
    this.populate("applications")
})

schema.pre(/^find/, function () {
    this.populate("addedBy");
});
*/

