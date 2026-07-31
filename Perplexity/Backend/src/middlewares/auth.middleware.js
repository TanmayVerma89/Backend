import jwt from 'jsonwebtoken'

export async function identifyUser(req,res,next) {
    const {token} = req.cookies

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
        return res.status(400).json({
            message: `Invalid or expired token`,
        });
    }
    req.userId  = decoded.id
    next()
}