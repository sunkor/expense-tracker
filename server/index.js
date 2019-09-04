const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const expenseRoutes = require('./routes/expense')
const mongoConnect = require('./helpers/database').mongoConnect

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(expenseRoutes)

mongoConnect(() => {
  app.listen(3000, err => {
    if (err) {
      console.log('An Error occured attempting to listening on port 3000.', err)
    }
    console.log('Listening')
  })
});