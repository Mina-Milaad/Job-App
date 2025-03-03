import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    let { token } = req.headers
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "invaled token", err })

        req.user = decoded

        next()

    })




}

