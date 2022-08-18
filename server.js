require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
//const { config } = require('process')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

//handles logs
app.use(logger)

//cors
app.use(cors(corsOptions))

//handles json
app.use(express.json())

app.use(cookieParser())

//handles resources in 'public' folder
app.use('/', express.static(path.join(__dirname, 'public')))

//handles routes
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

//handles 404
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


/*
writing some notes because I'm trying to learn


just something:
this server.js is basically the base or something
first import necessary stuff
then set up server, or rather what port it listens to
after that make other components and
add them here
into import list
and then gotta figure where to put the app.use



Notes:
Creating server

define express
define app
define port

make app listen

This is enough to make a running server
though it does nothing as of now
Next make the server serve information to us
this is done with "path" from nodeJS

Adding:

define path, add below "define app"

app.use
(what is this?)
(a route for finding public folder?)

---

basically the server has

defined/imported the necessary stuff

using app.use routes to public and routes/root
(public for materials that are used on the website)
(root for ???)

app.listen for listening (to a port?)

About "const PORT"
process.env.PORT is for when the app is deployed and the PORT is defined somewhere
|| means otherwise, the number after is the port that will be used otherwise

__dirname (two underscores and dirname):
a global variable that nodejs understand
it says "look inside the folder we are in"
if (__dirname, '/something')
it means that "look inside this folder, then at the following folder (still inside this folder)"
(((__dirname is technically optional, at least for server.js because it's "in the root" so to say)))



app.all is for 404 stuff, explained in notes in root.js

---

adding ability to process json
add.use json
(?why?)


 */