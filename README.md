# 💰 AI Finance Tracker

A full-stack personal finance management application built with **React and Node.js** to help users track expenses, subscriptions, EMIs, savings goals, and overall financial progress.

## Features

* 📊 Interactive financial dashboard
* 💸 Add, update, delete, and track expenses
* 🔄 Manage recurring subscriptions
* 💳 Track EMIs with due dates and payment status
* 🎯 Set and monitor savings goals
* 📈 Visualize income, expenses, savings, and goals with charts
* 🤖 AI-powered subscription insights
* 🔐 User authentication with Clerk
* 👤 User profile and financial information management
* 📱 Responsive UI for different screen sizes
* 🔔 Toast notifications and interactive UI feedback

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router
* Axios
* Clerk Authentication
* Recharts
* Framer Motion
* Lucide React
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios
* Clerk Express Middleware

### AI Integration

* Mistral AI API for subscription analysis and personalized financial insights

## 📂 Project Structure

```text
AI-Finance-Tracker/
│
├── backend/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── authpages/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## ⚙️ Core Modules

### 📊 Dashboard

Provides an overview of monthly income, savings goals, total expenses, savings, and saving rate with interactive financial charts.

### 💸 Expense Management

Allows users to add, edit, delete, and categorize expenses while keeping their financial data updated.

### 🔄 Subscription Tracker

Tracks subscription services, plans, billing cycles, next billing dates, and subscription status.

### 💳 EMI Tracker

Allows users to create, edit, search, and delete EMI records with amount, due date, and payment status.

### 🤖 AI Subscription Insights

Uses the **Mistral AI API** to analyze subscriptions and provide insights such as:

* Total subscription spending
* Expensive and low-cost subscriptions
* Potentially duplicate services
* Possible savings opportunities
* Personalized recommendations

### 🔐 Authentication

Uses **Clerk** for user authentication and connects user-specific financial data with their Clerk user ID.

## 🔌 API Modules

The backend provides REST API routes for:

```text
/api/users
/api/expenses
/api/subscriptions
/api/emi
/api/ai
```

The application uses **Axios** on the frontend to communicate with the backend REST APIs.

## User-Specific Data

Each user's financial data is associated with their **Clerk user ID**. When authenticated, the application uses this ID to fetch and manage the corresponding user's expenses, subscriptions, EMIs, and financial information.

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AI-Finance-Tracker
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

Create the required `.env` files and add the necessary credentials for:

* MongoDB
* Clerk
* Mistral AI

### 5. Start the Backend

```bash
cd backend
npm run dev
```

### 6. Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

## What I Learned

* Building reusable React components and page-based interfaces
* Managing application state with React hooks
* Integrating REST APIs using Axios
* Implementing client-side routing with React Router
* Implementing authentication using Clerk
* Working with MongoDB and Mongoose
* Building CRUD operations
* Creating responsive interfaces using Tailwind CSS
* Visualizing financial data using Recharts
* Integrating an AI API into a full-stack application
* Connecting frontend interfaces with backend services

## Author

**Kashish Parween**

Built as a full-stack web development project using **React, Node.js, MongoDB, and AI integration**.
