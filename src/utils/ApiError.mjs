export class ApiError extends Error{
    httpStatusCode;
    timestamp;

    constructor (httpStatusCode, message){
        if(message)
            super(message);
        else
            super("An error has occured");

        this.message = message;
        this.httpStatusCode = httpStatusCode;
        this.timestamp = new Date().toString();

        Error.captureStackTrace(this, this.constructor);
    }
}