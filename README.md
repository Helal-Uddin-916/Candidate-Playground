# Candidate Playground

## Overview

Candidate Playground is a minimal full-stack application that stores my personal candidate profile in a database and exposes it via a REST API along with a basic frontend UI. The application allows querying profile information such as skills and projects and demonstrates backend API design, database modeling, and frontend integration.

This project was developed as part of an assignment to showcase full-stack development fundamentals including API creation, querying, data persistence, and deployment readiness.

---

## Architecture

### Frontend
- React
- Minimal UI for viewing profile, skills, and projects
- Supports searching and filtering
- Communicates with backend via REST APIs

### Backend
- Node.js
- Express.js
- RESTful API design
- Middleware for validation, logging, rate limiting, and error handling

### Database
- MongoDB
- Mongoose ODM
- Seeded with real candidate data

### Project Structure

Candidate-Playground/
├── client/ # React frontend
├── server/ # Node.js backend
└── README.md


---

## API Endpoints

### Health Check

GET /health


Returns HTTP `200` if the service is running.

Live:
https://candidate-playground-1-vrw5.onrender.com/health


---

### Profile APIs

POST /profile
GET /profile
PUT /profile


---

### Query APIs

#### Get projects by skill
GET /projects?skill=javascript


#### Get top skills
GET /skills/top


#### Search across profile data
GET /search?q=react


---

## Database Schema

The application uses MongoDB with the following schema.

### Profile Collection

```json
{
  "name": "String",
  "email": "String",
  "education": "String",
  "skills": ["String"],
  "projects": [
    {
      "title": "String",
      "description": "String",
      "links": ["String"]
    }
  ],
  "work": ["String"],
  "links": {
    "github": "String",
    "linkedin": "String",
    "portfolio": "String"
  }
}

The database is seeded with real candidate data using a seed script.

Local Setup
Prerequisites
Node.js

npm

MongoDB (local or cloud)

Backend Setup
cd server
npm install
npm start
Frontend Setup
cd client
npm install
npm start
Deployment
The application is deployed and publicly accessible.

Live URLs
Frontend:

https://candidate-playground.vercel.app/
Backend API:

https://candidate-playground-1-vrw5.onrender.com/
Health Check:

https://candidate-playground-1-vrw5.onrender.com/health
The frontend communicates with the hosted backend API with CORS enabled.

Sample API Calls
Health Check
curl https://candidate-playground-1-vrw5.onrender.com/health
Get Projects by Skill
curl https://candidate-playground-1-vrw5.onrender.com/projects?skill=react
Search Profile Data
curl https://candidate-playground-1-vrw5.onrender.com/search?q=javascript
Optional Features Implemented
Basic authentication middleware

Rate limiting

Centralized error handling

Request validation

Logging using Winston

Acceptance Criteria
GET /health returns HTTP 200

Profile CRUD APIs are functional

Query endpoints return filtered and correct results

Seeded data is visible through API and UI

Frontend successfully consumes hosted backend API

