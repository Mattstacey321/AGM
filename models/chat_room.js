const mongoose= require('mongoose');
const User= require('./user');
const roomChat= mongoose.Schema({
    id_room:String,
    member:[String],
    messages:[
        {
            id_user:String,
            text:String,
            image:String,
            video:String,
            time_created:{ type: Date, default: Date.now }
        }   
    ]
})
module.exports= mongoose.model('roomChat',roomChat);