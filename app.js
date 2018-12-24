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
app.set('view engine', 'pug')
require('dotenv').config()
app.locals.env = process.env;

const Bouquet = require('./models/bouquet.model')



const adminRouter = require('./routes/admin/admin.routes')
app.use('/admin', adminRouter)

const adminBouquetRouter = require('./routes/admin/bouquet.routes')
app.use('/admin/bouquet', adminBouquetRouter)

const adminColorRouter = require('./routes/admin/color.routes')
app.use('/admin/color', adminColorRouter)

const adminFlowerRouter = require('./routes/admin/flower.routes')
app.use('/admin/flower', adminFlowerRouter)

const adminSizeRouter = require('./routes/admin/size.routes')
app.use('/admin/size', adminSizeRouter)

const adminPackingRouter = require('./routes/admin/packing.routes')
app.use('/admin/packing', adminPackingRouter)


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
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist'))


app.all('*', (req, res, next) => {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url)
    } else {
        next()
    }
})



app.get('/', (req, res) => {
    res.render('public/welcome/welcome', {
        title: 'Raccoon Flowers'
    })
})

app.get('/catalog', (req, res) => {
    Bouquet.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, bouquets) {
        res.render('public/catalog/catalog', {
            title: 'Каталог',
            bouquets: bouquets
        })
    })
})

app.get('/product', (req, res) => {
    Bouquet.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function (err, bouquets) {
        res.render('public/catalog/product', {
            title: 'Карточка товара',
            bouquets: bouquets
        })
    })
})

app.get('/bucket', (req, res) => {
    res.render('public/bucket/bucket', {
        title: 'Корзина'
    })
})

app.get('/order', (req, res) => {
    res.render('public/order/order', {
        title: 'Заказ'
    })
})

app.get('/info', (req, res) => {
    res.render('public/info/info', {
        title: 'Информация'
    })
})
app.get('/thanks', (req, res) => {
    res.render('public/info/thanks', {
        title: 'Спасибо!'
    })
})
app.get('/404', (req, res) => {
    res.render('public/info/404', {
        title: 'Не найдено'
    })
})

app.get('/registration', (req, res) => {
    res.render('public/registration/registration', {
        title: 'Вход/Регистрация'
    })
})

app.get('/catalog/:uri', (req, res) => {
    Bouquet.where({ uri: req.params.uri }).populate('flower').findOne((err, bouquet) => {
        return res.render('public/catalog/product', {
            title: 'Букет ' + bouquet.title,
            bouquet: bouquet
        })
    })
})













mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log('Connected to mongodb...')
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
