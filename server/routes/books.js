const express = require('express')
const router = express.Router()
const controller = require('../controllers/books')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)
// router.use('/:id/authors', require('../routes/authors'))

module.exports = router
