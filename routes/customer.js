const router = require('koa-router')()
const CCustomer = require('../controller/customer')
const cCustomer = new CCustomer()

router.post('/active', async (ctx, next) => {
  const userinfo = ctx.request.body;
  const card = await cCustomer.active(userinfo)
  ctx.body = card
})

router.post('/customer_list', async (ctx, next) => {
  const header = ctx.request.headers;
  if (!header.token) {
    ctx.body = {
      code: -1,
      data: {},
      msg: '请登录！'
    }
  }
  const { page, username, card_no } = ctx.request.body
  const { customer, total } = await cCustomer.getList({page, username, card_no})
  ctx.body = {
    code: 0,
    data: {
      customer,
      total,
      page
     }
  }
})

router.get('/customer/:card', async (ctx, next) => {
  const {card} = ctx.params;
  const userinfo = await cCustomer.getInfo(card)
  if (userinfo) {
    ctx.body = {
      code: 0,
      data: {
        userinfo
      }
    }
  } else {
    ctx.body = {
      code: -1,
      data: {},
      msg: '无相关信息'
    }
  }
  
})

module.exports = router