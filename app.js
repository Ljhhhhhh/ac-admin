const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const mongoose = require('mongoose')
const dbConfig = require('./model/config')

const index = require('./routes/index')
const users = require('./routes/users')
const card = require('./routes/card')
const customer = require('./routes/customer')

// error handler
onerror(app)
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(card.routes(), card.allowedMethods())
app.use(customer.routes(), customer.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
