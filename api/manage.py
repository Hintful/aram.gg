from app import app, db
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://root:root@localhost:3306/aramgg"

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command("db", MigrateCommand)


if __name__ == "__main__":
    manager.run()
