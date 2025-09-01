import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/Task.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//mongo connections
mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => {
    console.error("Mongo error:", err);
});

// all routes for app
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

app.put("/api/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id,{ text: req.body.text },{ new: true });
  res.json(updated);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});