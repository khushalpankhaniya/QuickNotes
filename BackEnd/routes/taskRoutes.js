import express from "express"
import { Table } from "../db/schema.js"

const router = express.Router();

router.get('/tasks', async (req, res) => {  
    try {
        const tasks = await Table.find();
        res.status(200).json({ success: true, data: tasks }); 
    } catch (error) {
        console.error("Error fetching tasks:", error); 
        res.status(500).json({ error: "Error fetching tasks", details: error.message });
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const { title, completed } = req.body;
        
        const newTask = new Table({ title, completed });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ error: "Error creating task", details: error.message });
    }
});

router.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: "Error updating task", details: error.message });
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Table.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting task", details: error.message });
    }
});

export default router;
