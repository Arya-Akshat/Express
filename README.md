# Express.js Project-Based Learning Path 🚀

This repository contains a curated series of projects designed to guide you from a beginner to a master in Express.js. Each project folder is a self-contained application that builds upon the concepts of the previous one, introducing new challenges and real-world patterns.

Whether you're new to backend development or looking to solidify your Express.js skills, this collection provides a structured, hands-on learning experience.

***

## 📂 The Projects

Here's a breakdown of the projects included in this learning path, ordered by difficulty.

### 🟢 1. Hello Express & Route Logger (Beginner)
> **Key Concepts:** Basic `Express.js` server setup, defining routes (`app.get`), and creating custom middleware for logging requests.

### 🟢 2. To-Do List REST API - No DB (Beginner)
> **Key Concepts:** Implementing `GET`, `POST`, `PUT`, `DELETE` methods. Handling JSON data in requests and responses. In-memory data storage.

### 🟡 3. Notes App with File Storage (Intermediate)
> **Key Concepts:** Using Node's built-in `fs` module for persistence. Structuring routes with `express.Router()`. Handling `POST`, `GET`, and `DELETE` requests to manipulate files.

### 🟡 4. Blog CMS with MongoDB (Intermediate)
> **Key Concepts:** Integrating a NoSQL database with `Mongoose`. Creating schemas and models. Building a full REST API for a Content Management System.

### 🟠 5. Auth API - Login/Register (Advanced)
> **Key Concepts:** User authentication with JSON Web Tokens (`JWT`). Hashing passwords with `bcrypt`. Protecting routes with custom authentication middleware.

### 🟠 6. Realtime Chat App with Socket.io (Advanced)
> **Key Concepts:** Implementing WebSockets for bidirectional communication. Managing real-time events, rooms, and basic session handling.

### 🔴 7. Job Board API - Full CRUD + Auth + Filter (Master)
> **Key Concepts:** Building a complex API with full CRUD operations. Implementing advanced filtering and searching using URL query parameters (`req.query`).

### 🔴 8. Deployable SaaS Dashboard (Master)
> **Key Concepts:** Structuring an application with the `MVC` pattern. Securing the API with `helmet`, `cors`, and `express-rate-limit`. Preparing for and deploying to platforms like Vercel or Render.

***

## 🚀 Getting Started

Follow these steps to run any of the projects on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Navigate to a project folder:**
    Each project is in its own directory.
    ```bash
    # Example: Navigate to the To-Do List API project
    cd "2. To-Do List REST API (No DB)"
    ```

3.  **Install dependencies:**
    Each project has its own `package.json` file.
    ```bash
    npm install
    ```

4.  **Run the server:**
    Most projects can be started with the `start` or `dev` script. Check the `package.json` in each project folder for the exact command.
    ```bash
    npm start
    ```

***

## 🛠️ Tech Stack

This repository showcases a wide range of backend technologies, including:

* **Core:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT), bcrypt
* **Real-time Communication:** Socket.IO
* **API Security:** Helmet, CORS, express-rate-limit
* **Deployment Platforms:** Vercel, Render

***
