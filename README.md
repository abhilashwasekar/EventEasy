# 🎉 EventEasy

**EventEasy** is a full-stack event management application built with **React (Vite)** frontend and **Node.js + Express + MongoDB** backend. Admins can create, edit, and delete events, and users can register for them. Each event maintains a separate collection of registrations.

---

## 🌐 Live Demo

Deployed on: [(https://event-easy.vercel.app/)]

---

## 🛠️ Tech Stack

### Frontend:
- React (with Vite)
- TailwindCSS
- React Router DOM
- Zustand (state management)
- Axios
- Framer Motion
- ShadCN UI
- Lucide Icons

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- Multer (for image uploads)
- CORS
- Dotenv

---

## 📂 Folder Structure


---

## 🧪 Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/eventeasy.git
cd eventeasy


##Install Dependencies

# Frontend
cd eventeasy-frontend
npm install

# Backend
cd ../server
npm install


##Start dev server

# Frontend
cd client
npm run dev

# Backend
cd server
npm start


MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventeasy
PORT=5000

