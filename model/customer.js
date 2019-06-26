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
    type: Number,
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
  create_time: {
    type: Number,
    default: Date.now()
  },
  exp_time: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Customer', Customer)