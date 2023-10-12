
#!Python modules and functions
import os
from decouple import config



#?TORTOISE_ORM
TORTOISE_ORM = {
    "connections": {"default": config("DATABASE_URL")},
    "apps": {
        "models": {
            "models": [
                "models.cart", "aerich.models",
                "models.note", "aerich.models",
                "models.course", "aerich.models",
                "models.profile", "aerich.models"
            ],
            "default_connection": "default"
        }
    }
}