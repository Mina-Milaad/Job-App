import bcrybt from 'bcrypt'
import mongoose from "mongoose";



const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    recoveryEmail: {
        type: String
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'
    },
    passwordChangedAt: Date,
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    }
}, { timestamps: true, versionKey: false })

schema.pre('save', function (next) {
    this.username = `${this.firstName}${this.lastName}`.toLowerCase();
    next();
});

schema.pre('save', function () {
    this.password = bcrybt.hashSync(this.password, 8)
})

schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrybt.hashSync(this._update.password, 8)
})



export const User = mongoose.model('User', schema)