const router = require('koa-router')()
const CUser = require('../controller/user')
const cUser = new CUser()

router.post('/login', async (ctx, next) => {
  const {
    username,
    pwd
  } = ctx.request.body;
  const token = await cUser.login(username, pwd);
  if (token) {
    ctx.body = {
      data: {
        token,
        username,
      },
      code: 0,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登录失败'
    }
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'user string'
})

module.exports = router