#

#!Python modules and functions
import os
from decouple import config


# ?base_dir
base_dir = os.path.abspath(os.path.dirname(__file__))
parent_directory = os.path.dirname(base_dir)

SQLite_URL = "sqlite:///" + os.path.join(parent_directory, "marketplace.db")
connections = SQLite_URL if config("DB_NAME") == "SQLite" else config("DATABASE_URL")


# ?TORTOISE_ORM
TORTOISE_ORM = {
    "connections": {"default": connections},
    "apps": {
        "models": {
            "models": [
                "models.cart",
                "aerich.models",
                "models.note",
                "aerich.models",
                "models.course",
                "aerich.models",
                "models.profile",
                "aerich.models",
            ],
            "default_connection": "default",
        }
    },
}
