const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the "blueprint" for our blog posts.
const postSchema = new Schema({
    title: {
        type: String,
        required: true // This field must be provided
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation date
    }
});

// Create a model based on the schema.
// Mongoose will create a collection named 'posts' (pluralizes 'Post').
const Post = mongoose.model('Post', postSchema);

// Export the model so we can use it in other files (like our router).
module.exports = Post;
