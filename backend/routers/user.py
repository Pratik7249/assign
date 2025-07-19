from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import UserBase, UserOut
from models import User, Submission
from database import get_db
from schemas import LoginUser
router = APIRouter()

@router.post("/signup", response_model=UserOut)
def signup(user: UserBase, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(user: LoginUser, db: Session = Depends(get_db)):
    print("Received login data:", user.email, user.password)

    db_user = db.query(User).filter(
        User.email == user.email, User.password == user.password
    ).first()

    if not db_user:
        print("Invalid credentials")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print("Logged in successfully:", db_user.email)
    return {
        "id": db_user.id,
        "role": db_user.role.lower()
    }

@router.get("/submissions/{assignment_id}")
def get_submissions_for_assignment(assignment_id: int, db: Session = Depends(get_db)):
    return db.query(Submission).filter(Submission.assignment_id == assignment_id).all()


