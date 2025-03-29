// error middleware || Next function

const errorMiddlelware = (err, req, res, next) => {
    console.error(err);

    const defaultError = {
        statusCode: 500,
        message: "Something went wrong."
    }

    if (typeof err === 'string') {
        defaultError.statusCode = 400;
        defaultError.message = err
    } else {
        // missing filed error
        if (err.name === "validationError") {
            defaultError.statusCode = 400;
            defaultError.message = Object.values(err.errors).map(item => item.message).join(', ');
        }

        // Duplicate error
        if (err.code && err.code === 11000) {
            defaultError.statusCode = 400;
            const field = Object.keys(err.keyValue)[0];
            message = `${field} field must be unique.`;
        }
    }

    // safe error 
    const safeError = {
        success: false,
        message: defaultError.message,
        error: {
            statusCode: defaultError.statusCode
        }
    }
    return res.status(defaultError.statusCode).json(safeError)
};

export default errorMiddlelware;