FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY templates ./templates
COPY static ./static

EXPOSE 8080

# Gunicorn for production-ish serving
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
