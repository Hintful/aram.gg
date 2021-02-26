from flask import Flask


def create_app():
    app = Flask(__name__)
    config_module = "aramgg.config.Config"
    app.config.from_object(config_module)

    from aramgg.models import db, migrate

    db.init_app(app)
    migrate.init_app(app, db)

    @app.route("/")
    def hello_world():
        return "Hello, World!"

    return app
