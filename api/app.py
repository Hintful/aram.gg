from flask import Flask
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

# URI convention: [DB_TYPE]+[DB_CONNECTOR]://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost:3306/aramgg"
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initializing migrate.
manager = Manager(app)
manager.add_command("db", MigrateCommand)
Base = declarative_base()

db.create_all()
db.session.commit()


@app.route('/')
def hello():
    return "Hello World!"


@app.route('/<name>')
def hello_name(name):
    return f"Hello {name}!"


if __name__ == '__main__':
    app.run()
