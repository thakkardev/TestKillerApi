const mongoose = require('mongoose')
const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
        trim: true
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      deletedAt: {
        type: Date,
        default: null
      }
})
module.exports=mongoose.model("subject",subjectSchema)