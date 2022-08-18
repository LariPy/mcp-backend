const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router

/*
Notes:

define express
define router (uses express stuff)
define path

router get request

export


adding 404 error thing "thing you requested not found"
(cannot GET)

create 404.html, a page that will be shown if 404 happens
then go to server.js
we want to add this after all the other routes
below all the app.use, before app.listen

app.all('*', ...
the asterisk means that anything that reaches app.all will be but through this
a catch all that goes to the end
then request (req, res) => stuff

first thing we know is that the response status is 404
(anything that reaches this point is 404?)
if request accepts html
send file that is in this path
(__dirname, views, 404.html)
else if request accepts json
(if there is a json request that wasn't routed properly)
response json, {message: '404 not found'}
finally an else that will be sent no matter what if html or json was not matched
res.type('txt').send('404 not found')
means "response is of type .txt file, the message inside is 404 not found"



regex code stuff
carrot ^ means = "at the beginning of the string only"
$ means = "at the end of the string only"
between those symbols is /
this means that "this will only match if the requested route is only a slash"
"and that would be the root"
pipe | means = "or" for regex
? at the end means optional (?)


path.join(__dirname, '..', 'views', 'index.html')
what this means is
__dirname = look at the folder you are in
.. = go up out of the folder you are in
'views' = go into views folder
'index.html' = find this file
 */