
// models/Job.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true },
    salary: { type: Number },
    description: { type: String, required: true },
    postedBy: {
        type: Schema.Types.ObjectId, // This will store the ID of the user
        ref: 'User', // This refers to the 'User' model
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
