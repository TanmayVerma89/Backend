export async function errorHandler(err, req, res, next) {
    const response = {
        message: err.message,
        stack: err.stack
    }

    res.status(err.status).json(response);
}