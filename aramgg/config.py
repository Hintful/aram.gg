class Config(object):
    """Base configuration"""

    user = "user"
    password = "password"
    hostname = "localhost"
    port = "5432"
    database = "aramgg"

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql+psycopg2://{user}:{password}@{hostname}:{port}/{database}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
