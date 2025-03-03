import mongoose, { Types } from "mongoose";



const schema = new mongoose.Schema({
    jobId: {
        type: Types.ObjectId,
        ref: "Jop"
    },
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    userTechSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey: false })

schema.pre(/^find/, function () {
    this.populate('userId', '-_id')
})


schema.post('init', (docs) => {

    if (docs.userResume) docs.userResume = "http://localhost:3000/uploads/applications/" + docs.userResume
})


export const Application = mongoose.model('Application', schema)