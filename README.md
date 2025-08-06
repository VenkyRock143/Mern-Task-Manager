
#🧠 MERN Task Manager
A full-stack task management app built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage personal tasks with full CRUD functionality — all secured with JWT authentication and HTTP-only cookies.


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


## 🚀 Features
* ✅ User authentication (register/login/logout)
* ✅ Secure routes with JWT & HTTP-only cookies
* ✅ Task CRUD (Create, Read, Update, Delete)
* ✅ Responsive UI using React & TailwindCSS
* ✅ Protected routes (only logged-in users can access dashboard)
* ✅ Backend API built with Express.js and MongoDB
* ✅ Modular and clean code structure
* ✅ Environment-based config with .env support
* ✅ Error handling and toast notifications

## 📁 Tech Stack

* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), bcryp
* **Frontend:** React.js, React Router, Axios
* **Database:** MongoDB + Mongoose

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
