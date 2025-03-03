import applicationRouter from "./application/application.routes.js"
import authRouter from "./auth/auth.routes.js"
import companyRouter from "./company/company.routes.js"
import jobRouter from "./job/job.routes.js"
import userRouter from "./user/user.routes.js"





export const bootstrap = (app) => {
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/companies', companyRouter)
    app.use('/jobs', jobRouter)
    app.use('/applications', applicationRouter)




}