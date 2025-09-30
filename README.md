MindWellAI
MindWellAI

Overview

A full-stack web application providing AI-powered mental health counseling and wellness support. Designed for Indian users, it offers:

24/7 AI chat support (Claude 3 placeholder)

One-time personal quiz to assess mood

Mood tracking and leaderboard

Personalized wellness recommendations

Crisis detection with alerts and emergency contact suggestions

Family, academic, and workplace support

Multilingual and culturally sensitive support

Built with: Python Flask (Backend), PostgreSQL (Database), React.js (Frontend)

Features
Backend

REST API running on http://localhost:5000

User registration/login (anonymous users supported)

Encrypted sessions (60-min max)

One-time quiz for new users

AI chat endpoint (Claude 3 placeholder)

Mood tracking & leaderboard

Crisis detection (30-second response)

Database: Users, QuizResults, Conversations, Moods, CrisisEvents

SQLAlchemy ORM

Beginner-friendly, well-commented code

Secure data handling (no external tracking)

Frontend

React.js app running on http://localhost:3000

Components: Login, Quiz, Chat, MoodTracker, Leaderboard

Simple and user-friendly layout

Components organized in folders

Project Structure
mental_health_ai/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   ├── requirements.txt
│
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js
        ├── index.js
        └── components/
            ├── Login.js
            ├── Quiz.js
            ├── Chat.js
            ├── MoodTracker.js
            └── Leaderboard.js

Prerequisites

Python 3.8+

Node.js & npm

PostgreSQL installed and running

Git (optional, for cloning)

Backend Setup

Navigate to backend folder:

cd backend


Create & activate virtual environment:

python -m venv venv
# Linux / Mac
source venv/bin/activate
# Windows
venv\Scripts\activate


Install dependencies:

pip install -r requirements.txt


Configure PostgreSQL database in config.py:

SQLALCHEMY_DATABASE_URI = "postgresql://username:password@localhost/mental_health_db"


Run Flask backend:

export FLASK_APP=app.py   # Linux/Mac
set FLASK_APP=app.py      # Windows
flask run


Backend: http://localhost:5000

Frontend Setup

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start React app:

npm start


Frontend: http://localhost:3000

Usage

Open frontend at http://localhost:3000

Register or log in (anonymous option available)

Complete the one-time quiz (first-time users)

Start AI chat (Claude 3 placeholder)

Submit daily mood in Mood Tracker

View progress on Leaderboard

Crisis detection monitors messages for high-risk keywords automatically

Workflow Diagram
[User Login/Register] --> [One-time Quiz] --> [AI Chat / Counseling] --> [Mood Tracker] --> [Leaderboard]
                                |
                                v
                     [Crisis Detection / Emergency Alert]

Notes

Replace Claude 3 placeholder with actual API integration.

Maximum session length: 60 minutes.

Crisis detection triggers alerts within 30 seconds.

Secure data handling, no social media/external tracking.

License

Educational and development purposes only. Use responsibly and comply with local regulations regarding mental health support.
