# Backend (FastAPI)

This is the backend for Persona AI, built with Python, FastAPI, and scikit-learn.

## Features
- REST API for personality prediction
- Serves ML model and dataset
- Jupyter notebook for model development

## Setup

1. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```sh
   fastapi dev app.py
   ```
4. The API will be available at [http://localhost:8000](http://localhost:8000)

## Project Structure
- `app.py` — Main FastAPI app
- `model/model.pkl` — Trained ML model
- `dataset/` — CSV dataset
- `notebook/` — Jupyter notebook for model development

## Endpoints
- `/predict` — Predict personality type
- `/dataset` — Get dataset
- `/notebook` — View notebook (if served)

## License
MIT
