
#!FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


#Create FastAPI object from FastAPI class
app = FastAPI()


#Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




#*getHome
@app.get('/')
def getHome():
    return "Home"

