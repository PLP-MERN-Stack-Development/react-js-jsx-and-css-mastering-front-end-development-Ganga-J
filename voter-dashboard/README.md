Voter Dashboard Management System

This project is a full-stack application designed for managing voter records. The frontend is built with React.js and Tailwind CSS, and the backend utilizes Node.js/Express and MongoDB (Mongoose) for persistence.

🛠️ Technology Stack

Component

Technology

Role

Frontend

React, JSX, Tailwind CSS, React Router

User Interface and Client-Side Routing

Backend

Node.js, Express

RESTful API Service

Database

MongoDB (via Mongoose)

Persistent storage for voter records

🚀 Getting Started (Local Development)

To run this application locally, you must start the backend server and the frontend client separately.

1. Backend Server Setup

The backend server exposes the REST API endpoints (/voters) and connects to your local MongoDB instance.

Action

Details

Start Command

Run npm start or node server.js in your backend directory.

Local URL

http://localhost:5000

Data Flow

The server handles all database operations (CRUD).

2. Frontend Client Setup

The React application consumes the data from the backend API.

Action

Details

Start Command

Run npm run dev in your frontend directory (assuming you use Vite/Create-React-App).

Local URL

http://localhost:5173

Configuration

The app uses the VITE_API_URL environment variable to connect to the backend: VITE_API_URL=http://localhost:5000

💻 Program Functionality

The application is structured using a Layout component to ensure a consistent header and footer across all views.

1. The Dashboard View (/)

The main view (Home.jsx rendered via the Dashboard route) handles all primary management tasks:

Viewing Voters: Fetches and displays a list of all registered voters from http://localhost:5000/voters.

Adding Voters: Uses a form to submit a POST request to http://localhost:5000/voters.

Editing Voters: Each voter card or row has an 'Edit' button that triggers a PUT request to update the record.

Deleting Voters: Each voter card or row has a 'Delete' button that triggers a DELETE request to remove the record.

2. Navigation

The Header component uses React Router's <Link> elements to provide fast, single-page application navigation between views:

Dashboard: Navigates to the voter management view (/).

Candidates: Navigates to the placeholder view for candidate management (/candidates).

3. Architecture Overview

The App.jsx file defines the overall structure, using <BrowserRouter> and a primary <Route path="/" element={<Layout />}>. This ensures the application scales easily by allowing new pages to be nested within the main layout wrapper.