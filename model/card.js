const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Card = new Schema({
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
  status: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('Card', Card)