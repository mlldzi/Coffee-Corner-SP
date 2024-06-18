from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from app.models import User


class AuthService:
    @staticmethod
    def register_user(username, email, password, full_name, phone_number):
        user = User.query.filter_by(email=email).first()
        if user:
            return None, "Такой пользователь уже существует"

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password, full_name=full_name,
                        phone_number=phone_number)
        db.session.add(new_user)
        db.session.commit()

        return new_user, "Пользователь успешно зарегистрирован"

    @staticmethod
    def authenticate_user(email, password):
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            return user
        return None

    @staticmethod
    def get_user_profile(user_id):
        user = User.query.get(user_id)
        return user

    @staticmethod
    def update_user_profile(user_id, username=None, email=None, full_name=None, phone_number=None):
        user = User.query.get(user_id)
        if not user:
            return None, "Пользователь не найден"

        if email:
            existing_user = User.query.filter_by(email=email).first()
            if existing_user and existing_user.id != user_id:
                return None, "Данная почта уже используется другим пользователем"
            user.email = email
        if username:
            user.username = username
        if full_name:
            user.full_name = full_name
        if phone_number:
            user.phone_number = phone_number

        db.session.commit()

        return user, "Профиль успешно обновлен"
