const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // No two users can have the same username
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    }
});

// This is a "pre-save hook". It's a function that runs right before a new user document is saved to the database.
// We use it to hash the password.
userSchema.pre('save', async function (next) {
    // 'this' refers to the user document that is about to be saved.
    // We only want to hash the password if it's new or has been modified.
    if (!this.isModified('password')) return next();

    try {
        // A "salt" is random data added to the password before hashing to make it more secure.
        const salt = await bcrypt.genSalt(10); // 10 is the salt round, a measure of complexity.
        // Hash the password with the salt.
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// FIX: This pattern prevents the OverwriteModelError.
// It checks if the model has already been compiled. If it has, it uses the existing model.
// If not, it compiles a new one.
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
