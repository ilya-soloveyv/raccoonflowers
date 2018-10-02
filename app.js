const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mongoose = require('mongoose')
const keys = require('./config/keys')
const fs = require('fs')
const pug = require('pug')
require('dotenv').config()

const Flower = require('./models/flower.model')

app.set('view engine', 'pug')

const adminRoutes = require('./routes/admin.routes')
app.use('/admin', adminRoutes)

if (process.env.NODE_ENV != 'development') {
    app.use(function(req, res, next) {
        if (req.secure) {
            next()
        } else {
            res.redirect(301, 'https://' + req.headers.host + req.url)
        }
    })
}
app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'))

app.all('*', (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url)
    } else {
        next()
    }
})




var catalog = [
    {
        name: 'Цветок 1',
        uri: 'flower1',
        price: 3000
    },
    {
        name: 'Цветок 2',
        uri: 'flower2',
        price: 3500
    },
    {
        name: 'Цветок 3',
        uri: 'flower3',
        price: 5000
    }
]




app.get('/', (req, res) => {
    res.render('welcome', {
        title: 'Raccoon Flowers'
    })
})

app.get('/catalog', (req, res) => {
    res.render('catalog', {
        title: 'Каталог',
        catalog: catalog
    })
})

app.get('/catalog/:uri', (req, res) => {
    for (let item of catalog) {
        if (item.uri == req.params.uri) {
            return res.render('product', {
                title: item.name,
                product: item
            })
        }
    }
})









mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log('Connected to mongodb')
    if (process.env.NODE_ENV != 'development') {
        const https = require('https').createServer({
            key: fs.readFileSync('encryption/private.key'),
            cert: fs.readFileSync( 'encryption/intermediate.csr' ),
            ca: fs.readFileSync( 'encryption/raccoonflowers.com.csr' )
        }, app)
        https.listen(443)
    }
    http.listen(process.env.PORT, process.env.DNS, () => { console.log("Server is running...") })
})
