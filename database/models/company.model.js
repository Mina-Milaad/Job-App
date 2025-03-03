import mongoose, { Types } from "mongoose";



const schema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: [2, "too short description"],
        maxlength: [2000, "too long description"],
    },
    industry: {
        type: String,
        required: true,
        minlength: [2, "too short industry"],
        maxlength: [2000, "too long industry"],
    },
    address: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: String,
        enum: ['1-10', '11-20', '21-50', '51-100', '101-500', '500+'],
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true
    },
    companyHR: {
        type: Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, versionKey: false, toJSON: { virtuals: true }, id: false })


// schema.virtual("jobs", {
//     ref: "Job",
//     localField: "companyHR",
//     foreignField: "addedBy"
// })

// schema.pre("findOne", function () {
//     this.populate('jobs')
// })







//, toJSON: { virtuals: true }, toObject: { virtuals: true }
/*
schema.virtual("jobs", {
    ref: "Job",
    localField: "companyHR",
    foreignField: "addedBy"
})

schema.pre("findOne", function () {
    this.populate("jobs");
});

schema.pre(/^find/, function () {
    this.populate("companyHR");
});
*/
export const Company = mongoose.model('Company', schema)