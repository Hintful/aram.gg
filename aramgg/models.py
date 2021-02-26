from aramgg import db


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)

    def __init__(self, username: str, server: str):
        self.username = username
        self.server = server

    def __repr__(self):
        return f"<User {self.username}"


class Games(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)


class Champions(db.Model):
    __tablename__ = "champions"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    win_count = db.Column(db.Integer, unique=False)
    loss_count = db.Column(db.Integer, unique=False)
    kill_count = db.Column(db.Integer)
    death_count = db.Column(db.Integer)
    assist_count = db.Column(db.Integer)
    damage_dealt = db.Column(db.Integer)
    damage_taken = db.Column(db.Integer)
    healing = db.Column(db.Integer)

    def __init__(self, name: str):
        self.name = name

    def __repr__(self):
        return f"<Champion {self.name}"


db.create_all()
db.session.commit()
