# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copy requirements.txt
COPY requirements.txt /app/requirements.txt

# Install dependencies (including Hypercorn)
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the application code
COPY . .

# Expose the app port
EXPOSE 8000

# Run the app using Hypercorn
CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:8000"]
