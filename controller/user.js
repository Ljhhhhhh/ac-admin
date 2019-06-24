const User = require('../model/user')

class UserController {
  async login(username, pwd) {
    const user = await User.findOne({
      username: username,
      pwd: pwd
    })
    if (user) {
      const token = Date.now() + '~!@#$%' + pwd
      await user.update({
        token
      })
      return token
    } else {
      return ''
    }
  }
}

module.exports = UserController