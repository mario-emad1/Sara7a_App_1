const successResponse = ({
    res,
    statusCode = 200,
    message = "OK",
    data = {},
}) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data
    })
};

export default successResponse;
