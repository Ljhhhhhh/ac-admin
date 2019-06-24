const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
  username: {
    type: String,
    require: true
  },
  identity: {
    type: String,
    require: true
  },
  sex: {
    type: Boolean,
    default: 0
  },
  pwd: {
    type: String,
    require: true
  },
  card_no: {
    type: String,
    require: true
  },
  token: {
    type: String,
    default: '',
  }
})

module.exports = mongoose.model('User', User)