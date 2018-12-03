const router = require('express').Router()

router.get('/', (req, res) => {
    res.redirect('/admin/bouquet')
})

module.exports = router;