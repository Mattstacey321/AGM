const mongoose= require('mongoose');
const ChatPrivate= mongoose.Schema({
    userID:String,
    pendingMessage:[{
        userID:String,
        messages:[String],
        time:String
    }],
    incommingMessage:[
        {
            friendID:String,
            message:[String],
            time:String
        }
    ]


})
module.exports = mongoose.model('ChatPrivate',ChatPrivate);