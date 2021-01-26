import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postMessageSchema = new Schema({
    title: String,
    message: String,
    creatorName: String,
    creator: String,
    tags:[String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
},{
    timestamps: true
})

/*
    With the second argument {timestamps: true}, the follow fields are added to the shema: 
        createdAt: {type: Date, default: new Date()}
        updatedAt: {type: Date, default: new Date()}

 */

 const PostMessage = mongoose.model('PostMessage', postMessageSchema);

 export default PostMessage;