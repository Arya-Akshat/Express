
// routes/jobRoutes.js
const express = require('express');
const jobRouter = express.Router();
const Job = require('../models/Job.js');
const protect = require('../middleware/authMiddleware');

// POST /jobs - Create a new job posting (Protected)
jobRouter.post('/', protect, async (req, res) => {
    try {
        const { title, company, location, type, salary, description } = req.body;
        const job = new Job({
            title, company, location, type, salary, description,
            postedBy: req.user.id // Get user ID from the protect middleware
        });
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /jobs - Get all jobs with filtering
jobRouter.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' }; // Case-insensitive search
        }
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.salary && req.query.salary.gte) {
            query.salary = { $gte: Number(req.query.salary.gte) }; // Greater than or equal to
        }
        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /jobs/:id - Get a single job
jobRouter.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /jobs/:id - Update a job (Protected, Ownership check)
jobRouter.patch('/:id', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Ownership Check
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to update this job' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /jobs/:id - Delete a job (Protected, Ownership check)
jobRouter.delete('/:id', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Ownership Check
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this job' });
        }

        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = jobRouter;
