const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const fs = require('fs')
const pug = require('pug')
require('dotenv').config()

app.set('view engine', 'pug')

app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.all('*', (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'http://' + req.headers.host.replace(/^www\./, '') + req.url)
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    res.render('welcome', {
        title: 'Raccoon Flowers'
    })
})

if (process.env.NODE_ENV == 'development') {
    const https = require('https').createServer({
        key: fs.readFileSync('encryption/private.key'),
        cert: fs.readFileSync( 'encryption/intermediate.csr' ),
        ca: fs.readFileSync( 'encryption/raccoonflowers.com.csr' )
    }, app)
    https.listen(443)
}

http.listen(process.env.PORT, process.env.DNS, () => { console.log("Server is running...") })