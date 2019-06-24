const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Customer = new Schema({
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
  },
  create_time: {
    type: Number,
    default: Date.now()
  }
})

module.exports = mongoose.model('Customer', Customer)