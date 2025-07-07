from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import nbformat
from pydantic import BaseModel
import pickle as pkl

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