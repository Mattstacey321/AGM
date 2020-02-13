const mongoose = require('mongoose');
const Room = mongoose.Schema({
  roomName: String,
  isPrivate: {
    type: Boolean,
    default: false
  },
  game: {
    id: String,
    name: String
  },
  description: String,
  maxOfMember: {
    type:Number,
    default:1
  },
  hostID: String,
  member: [String],
  blacklist: [String],
  createAt:{
    type:Date,
    default:Date.now()
  }
})

module.exports = mongoose.model('roomList', Room);
