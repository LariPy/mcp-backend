const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error 

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler



/*
Notes:

require logEvents from logger

creating errorHandler
(this overrides a default errorhandler from express)
has error, request, response, next
inside this function
logEvents template litearl
err.name, err.message, req.method, req.url, req.headers.origin, errLog.log
console log err stack

status
returns status code if one is given, if not given then returns 500 which is server error

set status to what is determined (either the given or 500?)

response json data message:err.message

export

add errorhandler into server.js imports


*/