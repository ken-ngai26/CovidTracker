# Create our image based on Python 3.8
FROM python:3.8

# Expose ports
EXPOSE 5000

RUN pip3 install Flask
RUN pip3 install SQLAlchemy
RUN pip3 install Flask-SQLAlchemy
RUN pip3 install python-dotenv

# Install requirements using pip
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

ENV LISTEN_PORT=5000

ENV FLASK_APP=api.py
ENV FLASK_DEBUG = 1 
ENV FLASK_RUN_HOST=0.0.0.0
# Set working directory and addour Flask API files
# WORKDIR /app
# ADD . /app

WORKDIR /backend
COPY . .

EXPOSE 5000
CMD flask run


