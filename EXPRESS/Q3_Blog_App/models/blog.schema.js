import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);