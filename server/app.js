const express = require('express')
const app = express()
const port = process.env.PORT || 6000
const bodyParser = require('body-parser')
const morgan = require('morgan')



app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//routing to routes
app.use('/books', require('./routes/books'))
app.use('/books', require('./routes/authors'))


//error codes
app.use((err, req, res, next) => {
  console.log(err)
  const status = err.status || 500
  res.status(status).json({ error: err })
})

//automatic error
app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

//server
const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
