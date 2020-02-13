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
  maxOfMember: Number,
  hostID: String,
  member: [String],
  blacklist: [String]

})

module.exports = mongoose.model('roomList', Room);
