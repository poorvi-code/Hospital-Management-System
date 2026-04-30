# Hospital Management System

A complete, production-ready MERN stack application for managing hospital operations including patients, doctors, and appointments.

## Features
- **Patients**: Add, Edit, Delete, and View patients.
- **Doctors**: Add and View doctors.
- **Appointments**: Book, View history, and Cancel/Delete appointments.

## Tech Stack
- **Frontend**: React.js (Vite), React Router, Axios, CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).

## Folder Structure
```text
hospital-management/
│
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/         # Logic for API routes
│   │   ├── appointmentController.js
│   │   ├── doctorController.js
│   │   └── patientController.js
│   ├── models/              # Mongoose schemas
│   │   ├── Appointment.js
│   │   ├── Doctor.js
│   │   └── Patient.js
│   ├── routes/              # Express API routes
│   │   ├── appointmentRoutes.js
│   │   ├── doctorRoutes.js
│   │   └── patientRoutes.js
│   ├── .env                 # Environment variables
│   ├── package.json
│   ├── seed.js              # Sample data seeder
│   └── server.js            # Main server file
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── axios.js     # Axios instance & API config
    │   ├── components/
    │   │   └── Navbar.jsx   # Top navigation
    │   ├── pages/
    │   │   ├── Appointments.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Doctors.jsx
    │   │   └── Patients.jsx
    │   ├── App.jsx          # Main App component with routing
    │   ├── index.css        # Global styles
    │   └── main.jsx         # React entry point
    ├── .env                 # Frontend env variables
    ├── package.json
    └── vite.config.js
```

## How to Run Locally

### 1. Prerequisites
- Node.js installed
- MongoDB running locally (or use a MongoDB Atlas URI)

### 2. Setup Backend
1. Open terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure the `MONGO_URI` in `backend/.env` is correct. By default, it's `mongodb://127.0.0.1:27017/hospital_management`.
4. Seed sample data (optional but recommended):
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Server will run on http://localhost:5000)*

### 3. Setup Frontend
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(App will open on http://localhost:5173)*

---

## Instructions to Deploy on Vercel

### Backend Deployment (Vercel API)

1. Create a `vercel.json` file in your `backend` directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```
2. Ensure you are using MongoDB Atlas (cloud database), not a local MongoDB, because Vercel requires a public database URL.
3. Push your backend code to a GitHub repository.
4. Go to Vercel and import your backend repository.
5. In **Environment Variables**, add:
   - `MONGO_URI` = *Your MongoDB Atlas Connection String*
6. Click **Deploy**. Vercel will give you a backend URL (e.g., `https://your-backend.vercel.app`).

### Frontend Deployment (Vercel)

1. Open `frontend/.env` (or change it in Vercel's environment settings) and update the API URL to match your deployed backend:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```
2. Push your frontend code to a GitHub repository.
3. Go to Vercel and import your frontend repository.
4. Framework Preset should automatically be detected as **Vite**.
5. In **Environment Variables**, add:
   - `VITE_API_URL` = *Your Vercel Backend URL + /api*
6. Click **Deploy**. Vercel will build and deploy the React app.
