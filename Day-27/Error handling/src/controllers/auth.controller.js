/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function register(res, req, next) {
    const err = new Error("Password is too weak");
    err.status = 409
    next(err)
}

const authController = {
    register
}

export default authController