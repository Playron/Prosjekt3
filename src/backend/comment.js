import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    movieName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        requried: true,
    }
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;