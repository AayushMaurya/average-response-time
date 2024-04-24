import { ApiError } from "../utils/ApiError.mjs";
import { Sequelize } from "sequelize";

// this will handle all the errors passing from controller

export function errorHandler(err, req, res, next) {

    console.log("error from middleware");
    console.log(err);

    let httpStatusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof ApiError) {
        httpStatusCode = err.httpStatusCode;
        message = err.message;
    }
    else {
        if (typeof err === "string")
            message = err;
        else if (err instanceof Sequelize.ValidationError)
            message = err.errors[0].message;
        else if (err instanceof Error)
            message = err.message;
    }

    return res.status(httpStatusCode).send({
        error: {
            status: httpStatusCode,
            message: message,
            timestamp: err.timestamp || undefined
        },
    });

}