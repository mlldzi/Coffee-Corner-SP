from werkzeug.security import generate_password_hash, check_password_hash
import re

from app import db
from app.models import User


class AuthService:
    @staticmethod
    def register_user(full_name, password, phone_number, role='user'):
        if not re.match(r'^\+?\d+$', phone_number):
            return None, "Неверный формат номера телефона"

        user = User.query.filter_by(phone_number=phone_number).first()
        if user:
            return None, "Такой пользователь уже существует"

        hashed_password = generate_password_hash(password)
        new_user = User(full_name=full_name, password=hashed_password, phone_number=phone_number, role=role)
        db.session.add(new_user)
        db.session.commit()

        return new_user, "Пользователь успешно зарегистрирован"

    @staticmethod
    def authenticate_user(phone_number, password):
        user = User.query.filter_by(phone_number=phone_number).first()
        if user and check_password_hash(user.password, password):
            return user
        return None

    @staticmethod
    def get_user_profile(user_id):
        user = User.query.get(user_id)
        return user

    @staticmethod
    def update_user_profile(user_id, full_name=None, phone_number=None):
        user = User.query.get(user_id)
        if not user:
            return None, "Пользователь не найден"

        if phone_number:
            existing_user = User.query.filter_by(phone_number=phone_number).first()
            if existing_user and existing_user.id != user_id:
                return None, "Данный номер телефона уже используется другим пользователем"
            user.phone_number = phone_number
        if full_name:
            user.full_name = full_name

        db.session.commit()

        return user, "Профиль успешно обновлен"
