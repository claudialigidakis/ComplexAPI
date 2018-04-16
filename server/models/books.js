//requires file system
const fs = require('fs')
const path = require('path')
const uuid = require('uuid/v4')
const file = path.join(__dirname, 'books.json')
const errors = []

function getAll() {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
  return {
    data: books
  }
}

function getOne(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
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

function getAuthor(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const books = JSON.parse(contents).books
  const book = books.find(book => book.id === id)
  // console.log(books, book, id)
  return book ? {data: book.author} : {error: 'book not found'}
}

function create(body) {
  const name = body.name
  const borrowed = body.borrowed || false
  const description = body.age || "description unavailable"
  let author = body.author
  let splitAuthor;
  if(!author) {
    errors.push('please include author for book')
  }
  else if(author) {
    splitAuthor = author.split(' ')
  }
  if (splitAuthor && splitAuthor.length > 2) {
    errors.push('please only enter first and last name for author')
  }

  if (errors.length > 0) {
    return {errors: errors}
  }

  const contents = fs.readFileSync(file, 'utf-8')

  author = [{fname: splitAuthor[0],
    lname:splitAuthor[1],
    id: uuid()
  }]

  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = {
    id: uuid(),
    name,
    borrowed,
    description,
    author
  }
  books.push(book)

  const json = JSON.stringify(newParsedFile)
  fs.writeFileSync(file, json)
  return {
    data: book
  }
}

function createAuthor(id, body) {
const contents = fs.readFileSync(file, 'utf-8')
const newParsedFile = JSON.parse(contents)
const books = newParsedFile.books
const book = books.find(book => book.id === id)

splitAuthor = author.split(' ')
author = [{fname: splitAuthor[0],
  lname:splitAuthor[1],
  id: uuid()
}]

book.author.push(author)
const json = JSON.stringify(newParsedFile)
fs.writeFileSync(file, json)
  return {data: book}
}


function update(id, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = books.find(book => book.id === id)
  if (book) {
    book.name = name.name
    book.description = name.description || book.description
    const json = JSON.stringify(newParsedFile)
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


function updateAuthor(id, authorid, name) {
  const contents = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = books.find(book => book.id === id)


  if (book) {
    let author = book.author.find(author => author.id === authorid)
    if(author){
      author.fname = name.fname || author.fname
      author.lname = name.lname || author.lname
      const json = JSON.stringify(newParsedFile)
      fs.writeFileSync(file, json)
      return {
        data: book.author
      }
    } else {
      return {
        error: 'Author Not Found'
      }
    }
  }
   else {
    return {
      error: 'Book Not Found'
    }
  }
}

function remove(id) {
  const contents = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(contents)
  const books = newParsedFile.books
  const book = books.find(book => book.id === id)

  if (book) {
    books = books.filter(book => book.id !== id)
    delete book.id
    const json = JSON.stringify(newParsedFile)
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


function removeAuthor(id, authorid) {
  const contents = fs.readFileSync(file, 'utf-8')
  const newParsedFile = JSON.parse(contents)
  let books = newParsedFile.books
  let book = books.find(book => book.id === id)

  if(book) {
    let author = book.author.find(author => author.id === authorid)
    if (author) {
      book.author = book.author.filter(author => author.id !== authorid)
      console.log(book)
      // delete author
      const json = JSON.stringify(newParsedFile)
      fs.writeFileSync(file, json)
      return {
        data: author
      }
    }  else {
      return {
        error: "Author Not Found"
      }
  }
}
    return {
      error: "Book Not Found"
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
