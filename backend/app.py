from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import nbformat
from pydantic import BaseModel
import pickle as pkl
import pandas as pd
from fastapi import Query

class PredictData(BaseModel):
    Time_alone_spent: float
    Time_spent_Alone: float	
    Stage_fear: bool
    Social_event_attendance	:float
    Going_outside: float	
    Drained_after_socializing: bool	
    Friends_circle_size:float
    Post_frequency: float	

labels = [
    "Extrovert",
    "Introvert"
]

with open("./model/prediction.pkl", "rb") as f:
    model = pkl.load(f)

df = pd.read_csv("./dataset/personality_datasert.csv")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/data")
def get_csv(page: int = Query(1, ge=1), size: int = Query(10, ge=1, le=100)):
    
    # Calculate start and end indices
    start = (page - 1) * size
    end = start + size

    # Convert to list of dicts for JSON response
    data = df.iloc[start:end].to_dict(orient="records")

    return {
        "page": page,
        "size": size,
        "total_records": len(df),
        "total_pages": (len(df) + size - 1) // size,  # ceiling division
        "data": data
    }


@app.get("/notebook")
def get_notebook():
    with open("./notebook/cnn-based.ipynb", "r", encoding="utf-8") as f:
        notebook = nbformat.read(f, as_version=4)
    return notebook.dict()

@app.post("/predict")
def predict(data: PredictData):

    input_data = [list(data.dict().values())]

    prediction = model.predict(input_data)

    return {"prediction": labels[prediction]}