# api/flask_app.py
from app import app  # Import your Flask app from app.py

def handler(request):
    from flask import request as flask_request
    with app.app_context():
        response = app.full_dispatch_request()
        return {
            'statusCode': response.status_code,
            'headers': dict(response.headers),
            'body': response.get_data(as_text=True)
        }