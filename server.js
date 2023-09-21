const express = require('express')
const dotenv = require('dotenv')
const moment = require('moment')
dotenv.config()

const app = express()
app.use(express.json())

const PORT = +process.env.PORT || 9000

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.post('/', (req, res) => {
  const date = req.body.date

  console.log(date, moment(date))
  res.send({
    date,
    moment: moment(date).toDate()
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
