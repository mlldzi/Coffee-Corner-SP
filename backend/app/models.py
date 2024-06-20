from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(200), nullable=False)
    full_name = db.Column(db.String(120))
    bonus_points = db.Column(db.Integer, default=0)
    phone_number = db.Column(db.String(20))

    @hybrid_property
    def password_hash(self):
        return self.password

    @password_hash.setter
    def password_hash(self, password):
        self.password = generate_password_hash(password)
