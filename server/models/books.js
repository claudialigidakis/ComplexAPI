//requires file system
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')


function getAll() {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  return {
    data: books
  }
}

function getOne(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  if (book) {
    return {
      data: book
    }
  } else {
    return {
      error: 'Book Not Found'
    }
  }
}

function create(body) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const name = body.name
  const borrowed = body.borrowed || false
  const description = body.age || "description unavailable"

  const book = {
    id: uuid(),
    name,
    borrowed,
    description
  }
  books.push(book)

  const json = JSON.stringify(books)
  fs.writeFileSync(file, json)
  return {
    data: book
  }
}


function update(id, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents)
  const book = books.find(book => book.id === id)
  if (book) {
    book.name = name.name
    book.description = name.description || book.description
    const json = JSON.stringify(books)
    fs.writeFileSync(file, json)
    return {
      data: book
    }
  } else {
    return {
      error: 'Book Not Found'
    }
  }
}

function remove(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  let books = JSON.parse(contents)
  const book = books.find(book => book.id === id)

  if (book) {
    books = books.filter(book => book.id !== id)
    delete book.id
    const json = JSON.stringify(books)
    fs.writeFileSync(file, json)
    return {
      data: book
    }
  } else {
    return {
      error: "Book Not Found"
    }
  }
}


module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}
