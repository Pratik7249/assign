# Part A – System Design (Written)
# 👉1. System Architecture

We propose a simple Client–Server architecture built on a RESTful API backend with role-based authentication and a frontend interface for teachers and students.
Components:

    Frontend: Built using React.js for UI interaction.

    Backend: FastAPI (Python) for API and business logic.

    Database: PostgreSQL or SQLite for storing users, assignments, and submissions.

    Authentication: Token-based (e.g., JWT) to differentiate students and teachers.

    Deployment: Can be containerized using Docker and deployed via platforms like Render or Railway.

# Data Flow:
``` 
Student/Teacher → React Frontend → FastAPI Backend → PostgreSQL Database
```

# 👉 Core Entities and Relationships
Entity Relationship Table:
Entity	Attributes
```
User	id (PK), name, email, password_hash, role (enum: student/teacher)
Assignment	id (PK), title, description, due_date, created_by (FK to User.id)
Submission	id (PK), assignment_id (FK), student_id (FK to User.id), content, timestamp
```
Relationships:

    A teacher can create many assignments

    A student can submit to many assignments

    An assignment can have many submissions

# 👉 API Endpoints
  👉 Teacher Creates Assignment
```
    URL: POST /assignments

    Request Body:

{
  "title": "DSA Assignment 1",
  "description": "Cover trees and sorting",
  "due_date": "2025-08-01"
}
    Auth: Teacher token

    Response: 201 Created with assignment ID
```
 #  👉 Student Submits Assignment
```
    URL: POST /submit

    Request Body:

{
  "assignment_id": 3,
  "content": "Here is my solution to the DSA assignment..."
}

    Auth: Student token

    Response: 201 Created with submission ID
```
  # 👉 Teacher Views Submissions
```
    URL: GET /submissions/{assignment_id}

    Auth: Teacher token

    Response: List of all student submissions for that assignment

[
  {
    "student_id": 7,
    "timestamp": "2025-07-19T12:00:00Z",
    "content": "My answer to Q1 is..."
  }
]
```
# 👉 Authentication Strategy
## Roles:

  #### Student: Can log in, submit assignments, and view their own submissions.

  #### Teacher: Can create assignments and view all student submissions.

## Approach:

   #### Use JWT (JSON Web Tokens) for secure login sessions.

   #### On login, a token is issued containing user ID and role.

   #### Protected routes validate the token and restrict access based on role.

   #### Example:

   #### /assignments → Only accessible by role "teacher"

   #### /submit → Only accessible by role "student"

# 👉 Scalability Suggestions

## To prepare this system for future growth:
 ### 👉 Backend Scaling

  #### Move from SQLite to PostgreSQL or MySQL for production.

  #### Use load balancing and multiple FastAPI instances with tools like Gunicorn and Nginx.

 ### 👉 Database Optimization

   #### Add indexes on foreign keys (e.g., assignment_id, student_id).

   #### Use caching (e.g., Redis) for frequently accessed data like assignment lists.

 ### 👉 Authentication & Security

   #### Use secure JWT tokens with refresh capability.

   #### Add rate limiting and input validation to prevent abuse.

 ### 👉 Cloud Deployment

   #### Deploy using containerization (Docker) on scalable cloud platforms (AWS, GCP, Vercel for frontend).

   #### Use CI/CD pipelines for seamless updates.

 ### 👉 Modularization

   #### Split backend into modular services (e.g., AuthService, AssignmentService) for future microservices migration.

 ### 👉 Summary (at a glance):
 ```
Area	Details
Architecture	Client-server, RESTful API, PostgreSQL, React frontend
Entities	User, Assignment, Submission
Roles	Student, Teacher
Core APIs	POST /assignments, POST /submit, GET /submissions/:id
Auth	JWT-based, role-specific access
Future Scaling	Cloud deployment, DB indexing, caching, microservices ready
```

# Part B – Prototype Implementation:

### How to run frontend? 
``` 
cd frontend
npm install
npm start
```

### How to run backend?
```
cd backend
pip install fastapi uvicorn sqlalchemy pydantic
uvicorn main:app --reload
```

### How to see Swagger UI?
 Go to your browser and open:
```
http://localhost:8000/docs
```
