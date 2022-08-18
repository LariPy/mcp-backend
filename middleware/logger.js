const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }




/*
logger component

date-fns = date stuff
uuid = generates random id for stuff
fs = file stuff(?)
fsPromises = promise stuff for file stuff
path = for finding directories and stuff, in other words pathing

function for creating log (helper function logEvents)
logEvents (makes the log)
object? creates object with parameters of "message" and "log file name"
creates a date for the log
applies date onto log object, creates random id, applies message (which comes from somewhere?)

try
if directory exists(check for path for logs directory)
if it doesn't exist, create it

so either we have created the directory or it already existed

then await
fsPromises append file (log file)
or create it if it doesn't exist(?)

catch error
console.log error


now writing the actual middleware
middleware (in general?) has
a request, a response and the ability to call next
so that it can move to the next piece of middleware

do logEvents
use request method(?)
request url
request origin, where the request originated from
then write it to reqLog.log(like a text file, convention for writing logs)
(usually this log stuff has conditionals to only log in specific scenarios
because the log could get full quickly otherwise)

console.log req.method, req.path (no need for tabs because this goes to console)
and finally next()

export

add to server.js imports
*/