from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import AssignmentCreate, AssignmentOut
from models import Assignment, User
from database import get_db

router = APIRouter()

@router.post("/assignments", response_model=AssignmentOut)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    teacher = db.query(User).filter(User.id == assignment.teacher_id, User.role == "teacher").first()
    if not teacher:
        raise HTTPException(status_code=400, detail="Invalid teacher ID")
    
    db_assignment = Assignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


@router.get("/assignments", response_model=list[AssignmentOut])
def list_assignments(db: Session = Depends(get_db)):
    return db.query(Assignment).all()
