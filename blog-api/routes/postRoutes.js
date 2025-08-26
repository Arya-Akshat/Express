const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Import the Post model

// --- GET /posts: Get all blog posts ---
// Sorted by creation date, newest first
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- POST /posts: Create a new blog post ---
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost); // 201 Created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request
    }
});

// --- GET /posts/:id: Get a single post ---
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' }); // 404 Not Found
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PATCH /posts/:id: Update a post ---
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.content != null) {
            post.content = req.body.content;
        }
        if (req.body.author != null) {
            post.author = req.body.author;
        }

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- DELETE /posts/:id: Delete a post ---
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
