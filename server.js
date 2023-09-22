const express = require('express')
const dotenv = require('dotenv')
const moment = require('moment')
const { Sequelize, DataTypes } = require('sequelize')
dotenv.config()

const app = express()
app.use(express.json())

const PORT = +process.env.PORT || 9000
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = +process.env.DB_PORT || 5432
const DB_NAME = process.env.DB_NAME || 'postgres'
const DB_USERNAME = process.env.DB_USERNAME || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres'

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres'
})

const User = sequelize.define('user', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  date: DataTypes.DATE,
  serverCalculatedDate: DataTypes.DATE,
  serverCalculatedClientDate: DataTypes.DATE
})

sequelize.sync()

app.get('/users', async (_, res) => {
  res.send(await User.findAll())
})

app.post('/users', async (req, res) => {
  const { name, email, date } = req.body
  const timezone = req.headers['x-timezone']
  console.log(moment(date).utcOffset(timezone).endOf('day'))
  const user = await User.create({
    name,
    email,
    date,
    serverCalculatedDate: moment().startOf('day').toDate(),
    serverCalculatedClientDate: moment(date)
      .utcOffset(timezone)
      .startOf('day')
      .toDate()
  })
  res.send(user)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
