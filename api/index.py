import sys
import os

api_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.abspath(os.path.join(api_dir, '..', 'backend'))

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
if api_dir not in sys.path:
    sys.path.insert(0, api_dir)

from main import app
from services.prediction_service import prediction_service

# Trigger artifact loading on serverless invocation
prediction_service.load_artifacts()

