from sqlalchemy import Table, Integer, ForeignKey, Column
from sqlalchemy.orm import relationship

from api.app import db, Base

junction_table = Table(
    "user_champion", Base.metadata,
    Column("user_id", Integer, ForeignKey("Users.id")),
    Column("champion_id", Integer, ForeignKey("Champions.id")),
    )


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    champions = relationship("Champions", secondary=junction_table)

    def __init__(self, username: str, server: str):
        self.username = username
        self.server = server

    def __repr__(self):
        return f"<User {self.username}"


class Games(db.Model):
    id = db.Column(db.Integer, primary_key=True)


class Champions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True)
    users = relationship("Users", secondary=junction_table)
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
