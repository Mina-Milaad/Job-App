import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())

bootstrap(app)
app.use('/uploads', express.static('uploads'))

app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})

app.use(globalError)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))