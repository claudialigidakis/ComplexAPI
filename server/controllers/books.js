const model = require('../models/books')

function getAll(req, res, next) {
  const books = model.getAll()
  return res.status(200).send({
    data: books.data
  })
}

function getOne(req, res, next) {
  const book = model.getOne(req.params.id)
  if (book.data) {
    return res.status(200).send({
      data: book.data
    })
  } else if (book.error) {
    return next({
      status: 404,
      message: book.error
    })
  }
}


function getAuthor(req, res, next) {
  const book = model.getAuthor(req.params.id)
  if (book.data) {
    return res.status(200).send({
      data: book.data
    })
  } else if (book.error) {
    return next({
      status: 404,
      message: book.error
    })
  }
}

function create(req, res, next) {
  const result = model.create(req.body)

  if (result.errors) {
    return next({
      status: 400,
      message: result.errors
    })
  }
  if(result.data) {
    return res.status(201).send({ data: result.data})
}
}

function createAuthor(req, res, next) {
  const result = model.createAuthor(req.params.id, req.body)

  if (result.errors) {
    return next({
      status: 400,
      message: result.errors
    })
  }
if(result.data) {
  return res.status(201).send({ data: result.data})
}
}

function update(req, res, next) {
  if (!req.body.name) {
    return next({
      status: 400,
      message: "Bad Request"
    })
  }
  const book = model.update(req.params.id, req.body)
  if (book.data) {
    return res.status(200).send({
      data: book.data
    })
  } else if (book.error) {
    return next({
      status: 404,
      message: book.error
    })
  }
}

function updateAuthor(req, res, next) {
  if (!req.body) {
    return next({
      status: 400,
      message: "Bad Request"
    })
  }
  const book = model.updateAuthor(req.params.id, req.params.authorid, req.body)
  if (book.data) {
    return res.status(200).send({
      data: book.data
    })
  } else if (book.error) {
    return next({
      status: 404,
      message: book.error
    })
  }
}

function remove(req, res, next) {
  const book = model.remove(req.params.id)
    if(book.data){
      return res.status(200).send({ data: book.data })
    }
    else if(book.error){
        return next({ status: 404, message: book.error })
    }
}


function removeAuthor(req, res, next) {
  const book = model.removeAuthor(req.params.id, req.params.authorid)
    if(book.data){
      return res.status(200).send({ data: book.data })
    }
    else if(book.error){
        return next({ status: 404, message: book.error })
    }
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getAuthor,
  updateAuthor,
  removeAuthor,
  createAuthor
}
