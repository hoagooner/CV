const mongoose = require('mongoose')


const boardSchema = new mongoose.Schema({
    user_id:{
        type:String
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Boards", boardSchema)