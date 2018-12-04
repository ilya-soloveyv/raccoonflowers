const router = require('express').Router()
const Packing = require('../../models/packing.model')

router.get('/', (req, res) => {
    Packing.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, packings) {
        console.log(packings)
        res.render('admin/packing/packings', {
            packings: packings
        })
    })
})

router.get('/create', (req, res) => {
    res.render('admin/packing/packing')
})

router.post('/update', (req, res) => {
    if (req.body.id) {
        Packing.findOneAndUpdate({ _id: req.body.id }, { $set: { title: req.body.title }}, (err, packing) => {
            if (err) return handleError(err)
            res.redirect('/admin/packing/' + packing._id)
        })
    } else {
        new Packing({ title: req.body.title }).save((err, packing) => {
            if (err) return handleError(err)
            res.redirect('/admin/packing/' + packing._id)
        })    
    }
})

router.get('/:id', (req, res) => {
    Packing.findOne({ _id: req.params.id }, (err, packing) => {
        if (err) return console.log(err)
        console.log(packing)
        if (packing) {
            return res.render('admin/packing/packing', {
                packing: packing
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;