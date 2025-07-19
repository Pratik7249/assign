from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import SubmissionBase, SubmissionOut
from models import Submission, Assignment, User
from database import get_db
from datetime import datetime 

router = APIRouter()

@router.post("/submit")
def submit_assignment(submission: SubmissionBase, db: Session = Depends(get_db)):
    new_submission = Submission(
        assignment_id=submission.assignment_id,
        student_id=submission.student_id,
        content=submission.content,
        timestamp=datetime.utcnow()
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return {"message": "Submission successful"}
