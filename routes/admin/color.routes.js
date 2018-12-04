const router = require('express').Router()
const Color = require('../../models/color.model')

router.get('/', (req, res) => {
    Color.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 10 }, function(err, colors) {
        console.log(colors)
        res.render('admin/color/colors', {
            colors: colors
        })
    })
})

router.get('/create', (req, res) => {
    res.render('admin/color/color')
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
            return res.render('admin/color/color', {
                color: color
            })
        }
        res.send('Не найдено')
    })
})

module.exports = router;