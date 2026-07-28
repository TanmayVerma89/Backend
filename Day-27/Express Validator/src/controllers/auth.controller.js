/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function register(req, res, next) {
    const { username, email, password} = req.body;
    const user = { username, email, password}
    res.status(201).json({
        message: `Registered successfully`,
        user
    });

}

const authController = {
    register
}

export default authController