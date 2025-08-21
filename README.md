# 🧑‍💼 Full-Stack Job Portal

A fully functional job portal web application that allows **users** to browse and apply for jobs, and **recruiters** to post and manage jobs, built using **MERN Stack** with **Clerk authentication**.

---

## 🚀 Features

### 👥 For Job Seekers (Users)
- Sign up / Log in using Clerk
- Search and filter job listings
- Upload and update resume (PDF)
- Apply to available jobs
- View and track application statuses (Pending / Accepted / Rejected)

### 🧑‍💼 For Recruiters (Companies)
- Login using a recruiter/company token
- Post new jobs
- Manage existing job listings (update visibility)
- View all applications per job
- Accept or reject applications

---

## 🛠️ Tech Stack

| Frontend            | Backend           | Authentication | Database |
|---------------------|-------------------|----------------|----------|
| React + TailwindCSS | Node.js + Express | Clerk          | MongoDB  |

Additional libraries:
- Axios (API requests)
- React-Toastify (notifications)
- Moment.js (date formatting)
- k-convert (salary formatting)

---

## 📸 Screenshots

>![Alt text](https://github.com/Aparna-b-b/Job-portal/tree/main/screenshots)
>


### 🔍 Job Listings Page


### 📄 Resume Upload & Applications

### 🧑‍💼 Recruiter Dashboard

---

## 🧪 Live Demo (Optional)

> You can mention:
> - [Frontend Live on Vercel](https://job-portal-gy1a.vercel.app/))
> - [Backend Deployed on Render]((https://job-portal-seven-chi.vercel.app/))

---

## 📂 Project Structure
```job-portal/
│
├── client/ # React frontend
│ ├── components/ # Reusable UI components
│ ├── context/ # AppContext for state
│ ├── pages/ # Route pages (Home, Applications, Dashboard, etc.)
│ └── App.jsx # Main app
│
├── server/ # Express backend
│ ├── routes/ # Auth, Jobs, Applications
│ ├── models/ # Mongoose models
│ └── index.js # Server entry point
│
├── .env # Environment variables
└── README.md # Project documentation```
