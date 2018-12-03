const router = require('express').Router()
const Bouquet = require('../../models/bouquet.model')

router.get('/', (req, res) => {
    Bouquet.paginate({}, { page: (req.query.p) ? req.query.p : 1, limit: 3 }, function(err, bouquets) {
        console.log(bouquets)
        res.render('admin/bouquet/bouquets', {
            bouquets: bouquets
        })
    })
})

module.exports = router;