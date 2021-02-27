# Create our image based on Python 3.9
FROM python:3.9
ENV PYTHONUNBUFFERED 1
COPY requirements.txt ./
RUN pip install -r requirements.txt
WORKDIR /backend
COPY . /backend
EXPOSE 8000
