const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const fs = require('fs')
const pug = require('pug')
require('dotenv').config()

app.set('view engine', 'pug')

if (process.env.NODE_ENV != 'development') {
    app.use(function(req, res, next) {
        if (req.secure) {
            next()
        } else {
            res.redirect(301, 'https://' + req.headers.host + req.url)
        }
    })
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

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
    console.log(req.body)
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

    // arr.find(k => k=='b');

    // res.render("product", {
        // title: ,
        // product: 
    // })
})

if (process.env.NODE_ENV != 'development') {
    const https = require('https').createServer({
        key: fs.readFileSync('encryption/private.key'),
        cert: fs.readFileSync( 'encryption/intermediate.csr' ),
        ca: fs.readFileSync( 'encryption/raccoonflowers.com.csr' )
    }, app)
    https.listen(443)
}

http.listen(process.env.PORT, process.env.DNS, () => { console.log("Server is running...") })