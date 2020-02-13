const mongoose= require('mongoose');
const User= require('./user');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const roomChat= mongoose.Schema({
    roomID: {
        type: ObjectId,
    },
    member:[String],
    messages:[
        {
            userID:String,
            text:String,
            createAt:{ 
                type: Date, 
                default: Date.now }
        }   
    ],
    createAt:{
        type:Date,
        default:Date.now()
    }
    
})
module.exports= mongoose.model('roomChat',roomChat);