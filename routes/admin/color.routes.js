const router = require('express').Router()
const Color = require('../../models/color.model')

router.get('/', (req, res) => {
    Color.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, colors) {
        console.log(colors)
        res.render('admin/color/color', {
            colors: colors
        })
    })
})

router.get('/create', (req, res) => {
    res.render('admin/color/item')
})

router.post('/update', (req, res) => {
    if (req.body.id) {
        Color.findOneAndUpdate({ _id: req.body.id }, { $set: { title: req.body.title }}, (err, color) => {
            if (err) return handleError(err)
            res.redirect('/admin/color/' + color._id)
        })
    } else {
        new Color({ title: req.body.title }).save((err, color) => {
            if (err) return handleError(err)
            res.redirect('/admin/color/' + color._id)
        })    
    }
})

router.get('/:id', (req, res) => {
    Color.where({ _id: req.params.id }).findOne((err, color) => {
        if (err) return handleError(err)
        console.log(color)
        if (color) {
            return res.render('admin/color/item', {
                color: color
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;