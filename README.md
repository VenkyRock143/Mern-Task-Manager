# Task Manager

A simple React application to manage tasks with real-time updates using Firebase Firestore.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)

## Introduction

The Task Manager app allows users to create, update, delete, and filter tasks. It uses Firebase Firestore for real-time database operations, ensuring that task lists are always up-to-date.

## Features

- Create tasks with a title, description, and status.
- Update the status of tasks.
- Delete tasks.
- Filter tasks by status (All, To Do, In Progress, Done).
- Real-time updates with Firebase Firestore.

## Demo

![Task Manager Screenshot](path-to-your-screenshot.png)

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)
- Firebase project with Firestore enabled

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/VenkyRock143/task-manager.git
    cd task-manager
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Usage

1. Start the development server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Firebase Configuration

To use Firebase Firestore, you need to configure your Firebase project:

1. Create a `.env` file in the root of your project and add your Firebase configuration:

    ```env
    REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
    REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
    ```

2. Ensure your `.gitignore` includes the `.env` file:

    ```gitignore
    # .gitignore
    .env
    ```

3. Update `firebase-init.js` to use the environment variables:

    ```javascript
    // firebase-init.js

    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export { db };
    ```

4. Restart the development server to apply the changes:

    ```sh
    npm start
    ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.
