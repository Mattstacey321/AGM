const mongoose= require('mongoose');
const ChatPrivate= mongoose.Schema({
    id_user:String,
    pendingMessage:[{
        id_user:String,
        messages:[String],
        time:String
    }],
    incommingMessage:[
        {
            id_friend:String,
            message:[String],
            time:String
        }
    ]


})
module.exports = mongoose.model('ChatPrivate',ChatPrivate);