const router = require('express').Router()
const Flower = require('../../models/flower.model')

router.get('/', (req, res) => {
    Flower.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 10 }, function(err, flowers) {
        console.log(flowers)
        res.render('admin/flower/flowers', {
            flowers: flowers
        })
    })
})

router.get('/create', (req, res) => {
    res.render('admin/flower/flower')
})

router.post('/update', (req, res) => {
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

router.get('/:id', (req, res) => {
    Flower.findOne({ _id: req.params.id }, (err, flower) => {
        if (err) return console.log(err)
        console.log(flower)
        if (flower) {
            return res.render('admin/flower/flower', {
                flower: flower
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;