
# MERN Task Manager

A simple Task Manager built with MongoDB, Express, React, Node. This app helps users to track their daily tasks and monitor their progress over time.

**Link:** [Task Manager](https://mern-task-manager-venky.netlify.app/)

## Folder Structure

```sh
Task-Manager
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── taskController.js
│   ├── models
│   │   └── task.js
│   ├── routes
│   │   └── taskRoutes.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   └── TaskManager.js
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── package-lock.json
│   └── package.json
```


## Overview

By using this app, users can:

- Add new tasks to track.
- Mark tasks as completed each day.
- Visualize task completion status with a task list.
- Persistent data storage using browser's local storage.

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/VenkyRock143/Mern-Task-Manager.git
