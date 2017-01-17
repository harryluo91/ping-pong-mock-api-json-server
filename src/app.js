const jsonServer = require('json-server')
const clone = require('clone')
const data = require('../data.json')

const app = jsonServer.create()
const router = jsonServer.router(data)

app.use((req, res, next) => {
  if (req.path === '/') return next()
  router.db.setState(data)
  next()
})

// custom output
router.render = function (req, res) {
  res.json({
   data: res.locals.data
  })
}

app.use(jsonServer.defaults({
  logger: process.env.NODE_ENV !== 'production'
}))

app.use('/api', router)

module.exports = app
