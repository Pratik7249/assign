from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

# ---------- User Schemas ----------

from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "student" or "teacher"

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        orm_mode = True

class LoginUser(BaseModel):
    email: str
    password: str



# ---------- Assignment Schemas ----------

class AssignmentCreate(BaseModel):
    title: str
    description: str
    due_date: date
    teacher_id: int

class AssignmentOut(BaseModel):
    id: int
    title: str
    description: str
    due_date: date
    teacher_id: int

    class Config:
        orm_mode = True


# ---------- Submission Schemas ----------

class SubmissionBase(BaseModel):
    assignment_id: int
    student_id: int
    content: str

class SubmissionOut(BaseModel):
    id: int
    class Config:
        orm_mode = True
