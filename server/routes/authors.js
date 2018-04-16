const express = require('express')
const router = express.Router()
const controller = require('../controllers/books')


router.get('/:id/authors', controller.getAuthor)
// router.get('/:id/authors/:authorId', controller.getAuthor)
router.post('/:id/authors', controller.createAuthor)
router.put('/:id/authors/:authorid', controller.updateAuthor)
router.delete('/:id/authors/:authorid', controller.removeAuthor)

module.exports = router
