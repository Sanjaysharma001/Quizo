# Quizo - Quiz Management System

## 📌 Project Overview
Quizo is a Quiz Management System built using **React (frontend)** and **TypeScript (backend)** with a **SQL database (MySQL/PostgreSQL)**. It allows users to create, edit, delete, and manage quizzes.

## 🚀 Features
- User authentication (basic static credentials for now).
- Create, edit, delete quizzes.
- View all available quizzes.
- Search quizzes by title.
- Responsive UI using ShadCN UI.

## 🔗 GitHub Repository
[GitHub Repository Link](https://github.com/yourusername/quizo)

## 🛠️ Tech Stack
- **Frontend**: React (Vite, ShadCN UI, React Query, Tailwind CSS)
- **Backend**: Node.js, Express.js, Prisma (TypeScript)
- **Database**: MySQL / PostgreSQL

---

## ⚙️ Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/quizo.git](https://github.com/Sanjaysharma001/Quizo.git
cd quizo
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

#### 🔧 Configure Environment Variables
Create a `.env` file inside the `backend` directory and add:
```env
DATABASE_URL="your_database_url"
PORT=5000
```

#### 🛠 Run Database Migrations
```sh
npx prisma migrate dev --name init
```

#### 🚀 Start the Backend Server
```sh
npm run dev
```

---

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```

#### 🚀 Start the Frontend Server
```sh
npm run dev
```

---

## 📡 API Documentation
### 🔹 **Authentication**
#### 🔹 `POST /auth/login`
**Request:**
```json
{
  "username": "admin",
  "password": "password"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "user": { "name": "Admin" }
}
```

---
### 🔹 **Quizzes**
#### 🔹 `GET /quizzes` - Get all quizzes
**Response:**
```json
[
  {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "A quiz on JS fundamentals",
    "questions": []
  }
]
```

#### 🔹 `GET /quizzes/:id` - Get quiz by ID
**Response:**
```json
{
  "id": 1,
  "title": "JavaScript Basics",
  "description": "A quiz on JS fundamentals",
  "questions": []
}
```

#### 🔹 `POST /quizzes` - Create a new quiz
**Request:**
```json
{
  "title": "React Quiz",
  "description": "A quiz about React",
  "questions": []
}
```
**Response:**
```json
{
  "id": 2,
  "title": "React Quiz",
  "description": "A quiz about React",
  "questions": []
}
```

#### 🔹 `PUT /quizzes/:id` - Update a quiz
**Request:**
```json
{
  "title": "Updated React Quiz",
  "description": "An updated quiz about React"
}
```
**Response:**
```json
{
  "id": 2,
  "title": "Updated React Quiz",
  "description": "An updated quiz about React"
}
```

#### 🔹 `DELETE /quizzes/:id` - Delete a quiz
**Response:**
```json
{
  "message": "Quiz deleted successfully"
}
```

---

## 🎯 Future Enhancements
- Implement JWT authentication.
- Add user roles (Admin, User).
- Enhance quiz structure with timed questions.
- Improve UI with animations.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

---

💡 *Happy Coding!* 🚀

