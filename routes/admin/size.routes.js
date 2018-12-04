const router = require('express').Router()
const Size = require('../../models/size.model')

router.get('/', (req, res) => {
    Size.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 10 }, function(err, sizes) {
        console.log(sizes)
        res.render('admin/size/sizes', {
            sizes: sizes
        })
    })
})

router.get('/create', (req, res) => {
    res.render('admin/size/size')
})

router.post('/update', (req, res) => {
    if (req.body.id) {
        Size.findOneAndUpdate({ _id: req.body.id }, { $set: { title: req.body.title }}, (err, size) => {
            if (err) return handleError(err)
            res.redirect('/admin/size/' + size._id)
        })
    } else {
        new Size({ title: req.body.title }).save((err, size) => {
            if (err) return handleError(err)
            res.redirect('/admin/size/' + size._id)
        })    
    }
})

router.get('/:id', (req, res) => {
    Size.where({ _id: req.params.id }).findOne((err, size) => {
        if (err) return handleError(err)
        console.log(size)
        if (size) {
            return res.render('admin/size/size', {
                size: size
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;