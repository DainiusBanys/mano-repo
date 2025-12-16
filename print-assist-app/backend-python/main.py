from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Python Image Service is running!"}

# We will add the image generation logic here later!