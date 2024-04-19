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

In the provided code, Redux is being used to manage the application's state. Redux is a state management library that helps you manage the state of your application in a centralized and predictable way. Here's a note on the changes you have made and how they relate to the code:

### `configureStore` and `userReducer`
- **Redux Toolkit (`@reduxjs/toolkit`)**: The application uses Redux Toolkit, a library that simplifies the use of Redux and provides a set of tools to manage state more efficiently.

- **`configureStore`**: This function is used to create a Redux store. The store holds the state of your application.

- **Reducer**: The `configureStore` function receives an object with a `reducer` property, which contains the application's reducer(s). In this case, the `user` reducer is provided from the `userSlice` file.

- **Middleware**: The `middleware` option allows you to customize the middleware used in the store. The code sets `serialzableCheck` to `false` to avoid warnings when the state contains non-serializable values.

### `userSlice` and Reducers
- **`createSlice`**: Redux Toolkit uses `createSlice` to create a slice of state. A slice contains the initial state, reducers (actions), and the slice's name.

- **Initial State**: The `initialState` object contains the initial state of the user slice, including `currentUser`, `error`, and `loading` properties.

- **Reducers**: The slice defines a set of reducers (functions) that handle actions to update the state. In your code:
    - `signInStart` sets the loading state to true.
    - `signInSuccess` updates the current user and sets the loading state to false and error to null.
    - `signInFailure` sets the error state and the loading state to false.

- **Actions**: Redux Toolkit automatically generates action creators from the reducers. The actions are exported (`signInStart`, `signInSuccess`, `signInFailure`) for use in the component.

### `SignIn` Component and Redux
- **`useSelector`**: This hook is used to access the current state from the Redux store. The code uses it to access the `loading` and `error` states from the user slice.

- **`useDispatch`**: This hook provides access to the Redux store's dispatch function. It is used to dispatch actions to update the state.

- **Form Handling**: The component handles form submission (`handleSubmit`) by dispatching the `signInStart` action, sending a request to the server, and then dispatching either the `signInSuccess` or `signInFailure` action based on the server response.

- **Error Handling**: The component displays any error messages stored in the `error` state from the Redux store.

- **Disabled Button**: The button is disabled while the form is submitting to prevent multiple submissions and provide a better user experience.

In summary, the code leverages Redux to manage the user state, including the current user, loading state, and any error messages. This approach centralizes state management, making it easier to handle and track changes in the application state.

The code uses several npm packages to implement Redux and other functionalities in the application. Here is an overview of these packages and their roles in the code:

### NPM Packages for ReduX Store 
1. **`@reduxjs/toolkit`**:
    - This is a package that provides tools to work with Redux more efficiently.
    - It includes the `configureStore` function to create a Redux store, the `createSlice` function to create reducers and actions, and other utilities to manage state.
    - The package makes working with Redux simpler and more productive, especially for beginners.

2. **`react-redux`**:
    - This package provides bindings for React to work with Redux.
    - It includes hooks like `useSelector` and `useDispatch` to interact with the Redux store from React components.
    - `useSelector` is used to access the current state from the Redux store, while `useDispatch` provides the dispatch function to dispatch actions.

3. **`react-router-dom`**:
    - This package provides routing capabilities in a React application.
    - In the code, it is used for navigation and creating links between different routes (e.g., using `Link` and `useNavigate`).

4. **`redux`**:
    - This package provides the core Redux functionality and is a dependency of `@reduxjs/toolkit`.
    - It includes functions for creating a Redux store, reducers, and actions.

### How the Code Works with Redux
- The code uses the packages from `@reduxjs/toolkit` and `react-redux` to set up a Redux store and manage user state.
- A slice (`userSlice`) is created using `createSlice` from `@reduxjs/toolkit`. It includes the initial state and reducers for managing user authentication state.
- The Redux store is configured using `configureStore` with the user reducer from the slice.
- In the `SignIn` component, `useSelector` is used to access the loading and error states from the Redux store, and `useDispatch` is used to dispatch actions.
- The component handles form submission by dispatching actions and updating the Redux store based on the server's response.

These packages work together to manage state, enable component communication, and handle routing in the application. They help to structure the application in a clear and predictable way, making it easier to maintain and scale.