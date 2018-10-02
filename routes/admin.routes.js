const router = require('express').Router()
const Flower = require('../models/flower.model')

router.get('/', (req, res) => {
    res.redirect('/admin/flower')
})
router.get('/flower', (req, res) => {
    // console.log(req.query.p)
    Flower.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, flowers) {
        console.log(flowers)
        res.render('admin/flower/flower', {
            flowers: flowers
        })
    })
})

router.get('/flower/create', (req, res) => {
    res.render('admin/flower/item')
})

router.get('/flower/:id', (req, res) => {
    Flower.where({ _id: req.params.id }).findOne((err, flower) => {
        if (err) return handleError(err)
        console.log(flower)
        if (flower) {
            return res.render('admin/flower/item', {
                flower: flower
            })
        }
        res.send('Не найдено')
    })
})

router.post('/flower/update', (req, res) => {
    if (req.body.id) {
        Flower.findOneAndUpdate({ _id: req.body.id }, { $set: { title: req.body.title }}, (err, flower) => {
            if (err) return handleError(err)
            res.redirect('/admin/flower/' + flower._id)
        })
    } else {
        new Flower({ title: req.body.title }).save((err, flower) => {
            if (err) return handleError(err)
            res.redirect('/admin/flower/' + flower._id)
        })    
    }
})

module.exports = router;