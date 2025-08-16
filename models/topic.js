const mongoose = require("mongoose")
const topicSchema = mongoose.Schema({
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subject',
        required:true
    },
    topicName:{ 
        type: String, 
        required: true, 
        trim: true 
    }, 
    isDeleted:{ 
        type: Boolean, 
        default: false 
    }, 
    deletedAt:{ 
        type: Date, 
        default: null 
    }
});
module.exports=mongoose.model("topic",topicSchema)