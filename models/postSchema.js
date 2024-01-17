const mongoose = require("mongoose")

const Schema = mongoose.Schema;
// this is post schema 
const PostSchema = new Schema({
    title :{ 
        type: String,
        required:true,
    },
    subtitle  :{ 
        type: String,
        required:true,
    },
    content  :{ 
        type: String,
        required:true,
    },
    banner :{
        type: String,
        required:true,
    },
    thumbnail :{
        type: String,
        required:true,
    },
    createTime:{
        type: Date,
        default:Date.now,
    },
    updateTime:{
        type:Date,
        default:Date.now,
    },
    userid:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
});

module.exports = mongoose.model('Post',PostSchema);