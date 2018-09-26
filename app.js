const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const pug = require('pug')
require('dotenv').config()

app.set('view engine', 'pug')

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

http.listen(process.env.PORT, process.env.DNS, () => {
    console.log("Server is running...")
})