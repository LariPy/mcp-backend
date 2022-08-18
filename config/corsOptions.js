const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 


/*
Notes:

if (allowedOrigins.indexOf(origin) !== -1) 
explanation
if
check allowedOrigins array
is the origin that we got from somewhere on this array
!== -1 means "if it's not equal to -1"
this would limit it to only those in the array would only be able toaccess
our restapi but then that would screen out other postware like Postman
that we might use to test our application
for this purpose:
|| !origin which means "or not origin"

else
callback new error not allowed by cors

credentials true, usually
optionsSuccessStatus: 200

export

add to server.js
*/