const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

// BUG: endpoint typo ('/task' instead of '/tasks')
app.get('/task', (req, res) => {
  res.json(tasks);
});

// BUG: No validation, completed always true, missing priority check
app.post('/tasks', (req, res) => {
  const { title, priority } = req.body;
  const task = {
    id: nextId++,
    title,
    completed: true, // BUG: should be false by default
    priority // BUG: no check for allowed values
  };
  tasks.push(task);
  res.status(201).json(task);
});

// MISSING: No endpoint to update 'completed' status

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});