# Create our image based on Python 3.9
FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /app/api
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
EXPOSE 8000
