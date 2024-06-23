from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    password = db.Column(db.String(200), nullable=False)
    full_name = db.Column(db.String(120))
    bonus_points = db.Column(db.Integer, default=0)
    phone_number = db.Column(db.String(20))
    role = db.Column(db.String(50), default="user", nullable=False)

    @hybrid_property
    def password_hash(self):
        return self.password

    @password_hash.setter
    def password_hash(self, password):
        self.password = generate_password_hash(password)


from datetime import datetime


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_completed = db.Column(db.Boolean, default=False, nullable=False)
    prepared_by = db.Column(db.DateTime, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    cart = db.Column(db.Text, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
