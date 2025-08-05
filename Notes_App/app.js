// 1. Imports
const express = require('express');
const fs = require('fs').promises; // Use the promises version of the fs module
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import the v4 function from uuid

// 2. Basic Express Setup
const app = express();
const port = 3000; // Standardized variable name
const NOTES_FILE = path.join(__dirname, 'notes.json');

// 3. Middleware
app.use(express.json()); // To parse JSON request bodies

// 4. Helper Functions for File I/O (A good practice for modularity)

/**
 * Reads notes from the notes.json file.
 * @returns {Promise<Array>} A promise that resolves to an array of notes.
 */
const readNotes = async () => {
    try {
        const data = await fs.readFile(NOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

/**
 * Writes an array of notes to the notes.json file.
 * @param {Array} notes - The array of notes to write.
 * @returns {Promise<void>}
 */
const writeNotes = async (notes) => {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf8');
};

// 5. REST API Routes

// --- GET /notes: Get all notes ---
app.get('/notes', async (req, res) => {
    try {
        const notes = await readNotes();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error reading notes' });
    }
});

// --- GET /notes/:id: Get a single note ---
app.get('/notes/:id', async (req, res) => {
    try {
        const notes = await readNotes();
        const note = notes.find(n => n.id === req.params.id);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error reading notes' });
    }
});

// --- POST /notes: Add a new note ---
app.post('/notes', async (req, res) => {
    // FIX: The line "newNote.id = uuidv4()" was here, which caused a ReferenceError
    // because `newNote` was not defined yet. It has been removed.
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const notes = await readNotes();
        const newNote = {
            id: uuidv4(), // The ID is correctly generated here.
            title,
            content
        };

        notes.push(newNote);
        await writeNotes(notes);

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Error saving note' });
    }
});

// --- DELETE /notes/:id: Delete a note ---
app.delete('/notes/:id', async (req, res) => {
    try {
        let notes = await readNotes();
        const noteExists = notes.some(n => n.id === req.params.id);

        if (!noteExists) {
            return res.status(404).json({ message: 'Note not found' });
        }

        notes = notes.filter(n => n.id !== req.params.id);
        await writeNotes(notes);

        res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
});

// --- PATCH /notes/:id: Update a note ---
app.patch('/notes/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        let notes = await readNotes();
        const noteIndex = notes.findIndex(n => n.id === req.params.id);

        if (noteIndex === -1) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (title) {
            notes[noteIndex].title = title;
        }
        if (content) {
            notes[noteIndex].content = content;
        }

        await writeNotes(notes);
        res.status(200).json(notes[noteIndex]);

    } catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
});


// 6. Start Server
app.listen(port, () => {
    // FIX: The variable was `PORT` but you were trying to use `port`.
    // I've standardized it to `port` (lowercase) to match the variable declaration.
    console.log(`Notes API server running at http://localhost:${port}`);
});
