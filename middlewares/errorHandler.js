
const globalErrHandler = (err,req,res,next) =>{

    console.log("Global Hanlder Called ")

    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status:'failed';
    const statusCode = err.statusCode ? err.statusCode:500;


    if (process.env.NODE_ENV === 'development'){
        res.status(statusCode).json({
            status,
            message,
            stack
        });

        }

    else{

        res.status(statusCode).json({
            status,
            message
        });

    }

}

// Not Found Error 

const notFoundErr = (req,res,next) =>{
    const err = new Error(`Can't find ${req.originalUrl} on server`);
    next(err)

}

module.exports = {globalErrHandler,notFoundErr};