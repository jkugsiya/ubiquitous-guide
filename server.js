const express = require('express')

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
  const date = req.body.date

  console.log(date, moment(date))
  res.send({
    date,
    moment: moment(date).toDate()
  })
})