const mongoose= require('mongoose')
const User= require('./user')
const message= mongoose.Schema({
    message:String,
    datetime:String
})
const listMessage= mongoose.Schema({
    username:String,
    listmessage:[message]
        
    
})
module.exports= mongoose.model('listmessage',listMessage);