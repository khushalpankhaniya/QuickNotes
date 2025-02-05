import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const Table = mongoose.model('QuickNotes', taskSchema);

export {Table};