# To-Do List Application

This project is a full-stack web application built using React, Node.js, Express, and MongoDB. It features user registration and login functionality, and allows users to manage a list of tasks. The tasks are stored in a MongoDB database and can be retrieved upon subsequent logins.

## Project Directory Tree

```
To-Do List/
├── backend/
│   └── server.js
├── frontend/
│   ├── public/images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── TaskPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...other frontend files...
├── README.md
└── ...other project files...
```

## Project Details

### Frontend

- **React**: The frontend is built using React, a popular JavaScript library for building user interfaces.
- **Components**:
  - `NavBar`: Displays navigation options. Shows login and register options if the user is not logged in, and logout option if the user is logged in.
  - `Register`: A form for user registration.
  - `Login`: A form for user login.
  - `PrivatePage`: A private page that displays a list of tasks. Users can add and delete tasks. The tasks are retrieved from the database.

### Backend

- **Node.js and Express**: The backend is built using Node.js and Express, a minimal and flexible Node.js web application framework.
- **MongoDB**: The database used to store user information and tasks.
- **Server**:
  - Runs on port 4000.
  - Establishes a local connection to the MongoDB database.
  - Provides CRUD routes for users and tasks.
  - Handles errors with appropriate messages.

### How Everything is Connected

1. **User Registration and Login**:
   - Users can register and login through the frontend forms.
   - The frontend sends requests to the backend API to create new users or authenticate existing users.
   - Upon successful login, users are redirected to the private page.

2. **Task Management**:
   - The private page allows users to add and delete tasks.
   - Tasks are stored in the MongoDB database.
   - The frontend retrieves the list of tasks from the backend API and displays them to the user.

## Running the Project

### Backend

1. Open a terminal and navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Start the server:
   ```sh
   node server.js
   ```

### Frontend

1. Open a terminal and navigate to the `frontend` directory from the parent directory:
   ```sh
   cd frontend
   ```
2. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Conclusion

This project demonstrates the use of React for the frontend, Node.js and Express for the backend, and MongoDB for the database. It showcases a complete web application with user authentication and task management functionality. The project is structured in a systematic way to ensure code quality and ease of understanding.