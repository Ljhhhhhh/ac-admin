const router = require('koa-router')()
const CCard = require('../controller/card')

const cCard = new CCard()

router.post('/card', async (ctx, next) => {
  const { page, card_no } = ctx.request.body
   const { cards, total } = await cCard.getList(page, card_no)
   ctx.body = {
     code: 0,
     data: {
      cards,
      total,
      page
     }
   }
})

router.post('/card/add', async (ctx, next) => {
  const header = ctx.request.headers;
  if (!header.token) {
    ctx.body = {
      code: -1,
      data: {},
      msg: '请登录！'
    }
  }
  const list = await cCard.createCards();
  ctx.body = {
    code: 0,
    data: {
      list
    }
  }
})

module.exports = router