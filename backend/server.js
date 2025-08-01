const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, priority } = req.body;
  //validation for allowed values for priority
  const validPriority = ['low', 'medium', 'high'];
  //check priority not null & is a valid priority
  if(!priority || validPriority.includes(priority)) { 
    return res.status(400).json({error: 'Invalid priority value!'});
  }
  const task = {
    id: nextId++,
    title,
    completed: false, 
    priority 
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;

  //validation for the task's status, check type
  if(typeof completed !== 'boolean'){
    return res.status(400).json({error: 'Status is not boolean!'});
  }

  //get the task
  const task = tasks.find(t = t.id === taskId);
  //check if task exist
  if(!task){
    return res.status(404).json({error: 'Task not found!'});
  }

  task.completed = completed;
  res.status(200).json({message: 'Task status updated.', task});
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});