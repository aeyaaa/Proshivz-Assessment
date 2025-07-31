# Task Tracker Assessment (Debug & Complete)

## Overview

You are provided with an incomplete Task Tracker application using **Angular** and **Node.js**. There are errors and missing logic in both the backend and frontend. Your task is to:

- Debug and **fix all errors** so the application works as described
- Complete any **missing features** listed in the requirements

## Requirements

### Backend (Node.js + Express)
- Should have these endpoints:
  - `GET /tasks` — returns list of tasks
  - `POST /tasks` — adds a new task with `{title, priority}`, auto-incremented `id`, default `completed: false`
- Each task: `{ id, title, priority, completed }`
- `title` must be at least 5 characters, `priority` must be one of `"low"`, `"medium"`, or `"high"`
- Tasks are stored in memory

### Frontend (Angular)
- Displays tasks from backend
- Form to add a new task (title + priority, with validation)
- Can mark tasks as completed (checkbox or button)

### Project Setup
- Provide or fix `npm` scripts to run both backend and frontend
- Do **not** add a database

## Submission

- Zip and send the completed folder.

## Evaluation

You will be evaluated on:
- Correctness and completeness
- Debugging and code understanding
- Code structure and organization