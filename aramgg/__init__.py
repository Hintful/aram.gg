from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from aramgg import config

db = SQLAlchemy()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = config.Config.SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.app_context().push()
db.init_app(app)
db.create_all()
