#?Pull official base image
FROM python:3.11.4-slim-buster


#?Set working directory
RUN mkdir /usr/src/app/
WORKDIR /usr/src/app/


#?Set environment variables
#Prevent Python from writing .pyc file
ENV PYTHONDONTWRITEBYTECODE 1 
#Ensure python output is send directly to the terminal without buffering
ENV PYTHONUNBUFFERED 1



#?Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt


#?Install Netcat
RUN apt-get update && apt-get install -y netcat


#?Copy project
COPY . /usr/src/app/


