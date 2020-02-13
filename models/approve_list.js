const mongoose = require('mongoose');
const ApproveList= mongoose.Schema({
    joinTime:Date,
    userID:String,
    idRoom:String,
    isApprove:Boolean
    
})
module.exports = mongoose.model("approveList",ApproveList);