const router = require('express').Router()
const Bouquet = require('../../models/bouquet.model')
const Flower = require('../../models/flower.model')
const Color = require('../../models/color.model')
const Size = require('../../models/size.model')
const translit = require('cyrillic-to-translit-js')
const async = require("async")

router.get('/', (req, res) => {
    Bouquet.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, bouquets) {
        res.render('admin/bouquet/bouquets', {
            bouquets: bouquets
        })
    })
})

router.get('/create', (req, res) => {
    async.parallel([
        function(callback){
            Color.find({},function(err,colors){
                if(err) return callback(err)
                callback(null, colors)
            })
        },
        function(callback){
            Flower.find({},function(err, flowers){
                if(err) return callback(err)
                callback(null, flowers)
            })
        },
        function(callback){
            Size.find({},function(err, sizes){
                if(err) return callback(err)
                callback(null, sizes)
            })
        }
    ],
    function (err, result) {
        if (result[0]) {
            return res.render('admin/bouquet/bouquet', {
                colors: result[0],
                flowers: result[1],
                sizes: result[2]
            })
        }
        res.send('Не найдено')
    })
})

router.post('/update', (req, res, next) => {
    // console.log(req.body.flowers)
    // return false
    var uri = (typeof req.body.uri !== 'undefined' && req.body.uri.trim()) ?
        translit().transform(req.body.uri.trim()).replace(/\s/g, '_') :
        translit().transform(req.body.title.trim(), '_').replace(/\s/g, '').toLowerCase()
    if (req.body.id) {
        Bouquet.findOneAndUpdate({ _id: req.body.id }, { $set: {
            title: req.body.title,
            uri: uri,
            flower: req.body.flowers,
            size: req.body.sizes
        }}, (err, bouquet) => {
            if (err) next(err)
            res.redirect('/admin/bouquet/' + bouquet._id)
        })
    } else {
        new Bouquet({
            title: req.body.title,
            uri: uri,
            flower: req.body.flowers,
            size: req.body.sizes
        }).save((err, bouquet) => {
            if (err) next(err)
            res.redirect('/admin/bouquet/' + bouquet._id)
        })    
    }
})

router.get('/:id', (req, res) => {
    async.parallel([
        function (callback) {
            Bouquet.where({ _id: req.params.id }).populate(['flower', 'size']).findOne((err, bouquet) => {
                if (err) return callback (err)
                callback (null, bouquet)
            })
        },
        function(callback){
            Color.find({},function(err,colors){
                if(err) return callback(err)
                callback(null, colors)
            })
        },
        function(callback){
            Flower.find({},function(err, flowers){
                if(err) return callback(err)
                callback(null, flowers)
            })
        },
        function(callback){
            Size.find({},function(err, sizes){
                if(err) return callback(err)
                callback(null, sizes)
            })
        }
    ],
    function (err, result) {
        // res.json(result)
        if (result[0]) {
            return res.render('admin/bouquet/bouquet', {
                bouquet: result[0],
                colors: result[1],
                flowers: result[2],
                sizes: result[3]
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;