# Setting Up Environment and Creating a React Vite Application

This guide will walk you through setting up a React Vite application and implementing user authentication and authorization using React Router and a MongoDB backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Backend](#backend)
    - [Mongoose Schema and Model](#mongoose-schema-and-model)
    - [User Authentication](#user-authentication)
    - [JWT Secret](#jwt-secret)
- [Sign-Up and Sign-In Components](#sign-up-and-sign-in-components)
- [Proxy Configuration](#proxy-configuration)

## Project Overview

This project is a React application demonstrating the basic usage of React Router for page navigation and user authentication.

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Project Structure

The project structure is as follows:

- `src/`: Contains the source code for the React application.
    - `pages/`: Contains individual page components such as `Home.js`, `About.js`, `Profile.js`, `SignIn.js`, and `SignUp.js`.
    - `App.js`: Main component where routing is configured.
- `public/`: Contains static assets and the HTML file.
- `models/`: Contains Mongoose schemas and models for the backend.
- `utils/`: Contains utility functions for the backend.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd project_name
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Install backend dependencies (if using a backend):

    ```bash
    npm install express mongoose dotenv
    npm install bcryptjs jsonwebtoken
    ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables:

    ```plaintext
    MONGO=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret>
    ```

## Development

To start the development server:

1. Start the React application:

    ```bash
    npm start
    ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

## Backend

### Mongoose Schema and Model

In the backend, use Mongoose to define schemas and models for MongoDB collections:

- `mongoose.Schema()`: Defines the structure of a document (e.g., a user) in the MongoDB collection.
- `mongoose.model()`: Compiles the schema into a model, allowing you to create, read, update, and delete documents.

### User Authentication

User authentication is handled in the backend with the following packages:

- `bcryptjs`: For hashing passwords.
- `jsonwebtoken`: For generating and verifying JWT tokens.
- `User`: A Mongoose model representing user data.

#### Sign-Up Method

1. Extract `username`, `email`, and `password` from the request body (`req.body`).
2. Hash the password using `bcryptjs.hashSync` with a salt round of 10.
3. Create a new user instance with the hashed password.
4. Save the user to the database.
5. Send a success response if the user is saved successfully.

#### Sign-In Method

1. Extract `email` and `password` from the request body (`req.body`).
2. Find a user with the provided email.
3. Compare the provided password with the stored hashed password using `bcryptjs.compareSync`.
4. If passwords match, generate a JWT token using `jwt.sign` with the user's ID as the payload.
5. Set an HTTP-only cookie with the generated token.
6. Send the user's data (excluding the password) as a JSON response.

### JWT Secret

The `JWT_SECRET` environment variable is crucial for signing and verifying JSON Web Tokens (JWTs):

- Used to sign tokens with `jwt.sign`.
- Enables the server to verify the authenticity of tokens with `jwt.verify`.
- Should be stored securely in an environment variable.

## Sign-Up and Sign-In Components

- The `SignUp` and `SignIn` components provide forms for user registration and authentication.
- These components handle form data using the `useState` hook and manage form submission asynchronously with the `fetch` API.

## Proxy Configuration

Vite provides proxy configuration for API requests during development:

- In `vite.config.js`, set up a proxy for the development server.
- Example:

    ```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react-swc';

    export default defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    secure: false,
                },
            },
        },
    });
    ```

This proxy configuration allows your frontend application to make API requests to a backend server running on `http://localhost:3000/api` during development, avoiding cross-origin resource sharing (CORS) issues.