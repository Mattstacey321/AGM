const mongoose= require('mongoose');
const User= require('./user')
const Room= mongoose.Schema({
    
    room_name:String,
    isPrivate:{
      type:Boolean,
      default: false
    },
    game:String,
    description:String,
    password:String,
    id_host:String,
    member:[String],
    blacklist:[String]
 
})

module.exports= mongoose.model('roomList',Room);
