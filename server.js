const express = require('express')

const app = express()
app.use(express.json())

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

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
