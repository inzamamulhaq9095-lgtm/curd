const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Model
const Task = mongoose.model("Task", {
  title: String,
});

// CREATE
app.post("/add", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
  });

  await newTask.save();
  res.json({ message: "Task added" });
});

// READ
app.get("/tasks", async (req, res) => {
  const data = await Task.find();
  res.json(data);
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));