# 🏠PG Booking CRM

A full-stack **PG Booking Customer Relationship Management (CRM)** system built to streamline the management of PG room inquiries, lead pipelines, property tours, bookings, agent activities, and sales analytics.

The application provides a modern, responsive interface with secure JWT authentication and real-time data management using MongoDB.

---

## 🚀 Live Demo

### Frontend
> *(Add your deployed frontend URL here)*

### Backend API
https://gharpayy-backend-gmk3.onrender.com



# ✨ Features

## 🔐 Authentication

- Secure JWT Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- Protected Routes
- Role Based Access
- Persistent Login
- Toast Notifications
- Password Visibility Toggle

---

## 📊 Dashboard

- Total Leads
- Hot Leads
- Scheduled Tours
- Confirmed Bookings
- Pipeline Overview
- Recent Leads
- Quick Add Lead
- Interactive Charts

---

## 👥 Lead Management

- Add Lead
- Edit Lead
- Delete Lead
- Search Leads
- Filter Leads
- Lead Status Updates
- Lead Assignment
- Follow-up Management
- Lead Tags
- Lead Intent Tracking

---

## 📌 Pipeline Management

Visual Kanban Board

Stages

- New
- Contacted
- Tour Scheduled
- Tour Done
- Negotiation
- Booked
- Dropped

Supports drag-and-drop workflow management.

---

## 🏡 Bookings

- Booking Management
- Tenant Information
- Deposit Tracking
- Payment Status
- Booking History

---

## 📅 Property Tours

- Schedule Tours
- Manage Visits
- Follow-up Tracking
- Tour Status

---

## 📝 Activities

- Call Logs
- Follow-up Notes
- Activity Timeline
- Agent Activity History

---

## 📈 Analytics

- Lead Distribution
- Conversion Rate
- Revenue Overview
- Pipeline Analysis
- Performance Reports
- Recharts Dashboard

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Recharts

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📂 Project Structure

```
GharPayy-CRM
│
├── backend
│   ├── src
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   │
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── context
│   ├── services
│   ├── hooks
│   ├── assets
│   ├── utils
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/aamnarifa/Gharpayy.git
```

```bash
cd Gharpayy
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm start
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔌 REST API

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | Get User Profile |

---

## Leads

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/leads | Get All Leads |
| POST | /api/leads | Create Lead |
| PATCH | /api/leads/:id | Update Lead |
| DELETE | /api/leads/:id | Delete Lead |

---

# 🎯 Application Workflow

```
Register/Login
        │
        ▼
JWT Authentication
        │
        ▼
Dashboard
        │
        ▼
Manage Leads
        │
        ▼
Pipeline Tracking
        │
        ▼
Schedule Tours
        │
        ▼
Bookings
        │
        ▼
Analytics & Reports
```

---

# 🌟 Highlights

- Full-stack MERN Architecture
- JWT Authentication
- MongoDB Atlas Integration
- Responsive Dashboard
- Kanban Pipeline
- CRUD Operations
- Secure REST APIs
- Axios API Layer
- Role-Based User Access
- Modern SaaS UI
- Mobile Responsive
- Interactive Charts
- Production Ready

---

# 🚀 Future Improvements

- Email Notifications
- WhatsApp Integration
- Property Management Module
- Tenant Portal
- Payment Gateway Integration
- File Uploads
- CSV Export
- PDF Reports
- Multi-Branch Support

---

# 👩‍💻 Developer

### **Aamna Rifa**

Computer Engineering (AI & ML)

Presidency University, Bengaluru

### GitHub

https://github.com/aamnarifa

### LinkedIn

https://www.linkedin.com/in/aamna-rifa/

---

# 📜 License

This project was developed for educational purposes, internship assessments, and portfolio demonstration.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
