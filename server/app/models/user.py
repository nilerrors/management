from pydantic import BaseModel
import datetime


class UserBase(BaseModel):
    email: str


class UserLogin(UserBase):
    password: str
    duration: datetime.timedelta | bool = False


class UserSignup(UserBase):
    password: str
    duration: datetime.timedelta | bool = False
