import { connect } from "mongoose";




export const dbConn = connect('mongodb://localhost:27017/job-App')
.then(() => {
    console.log("database Connected Successfully");
})