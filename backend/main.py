from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database import Base, engine
from routers import user, assignment, submissions

Base.metadata.create_all(bind=engine)

app = FastAPI(title="EdTech Assignment Tracker")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(user.router)
app.include_router(assignment.router)
app.include_router(submissions.router)
