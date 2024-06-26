import re
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User
from app.utils import validate_data


class AuthService:
    @staticmethod
    def register_user(data):
        is_valid, error_message = validate_data(data, ['full_name', 'phone_number', 'password'])
        if not is_valid:
            return None, error_message

        if not re.match(r'^\+?\d+$', data['phone_number']):
            return None, "Неверный формат номера телефона"

        user = User.query.filter_by(phone_number=data['phone_number']).first()
        if user:
            return None, "Такой пользователь уже существует"

        hashed_password = generate_password_hash(data['password'])
        new_user = User(full_name=data['full_name'], password=hashed_password,
                        phone_number=data['phone_number'], role=data.get('role', 'user'))
        db.session.add(new_user)
        db.session.commit()

        return new_user, "Пользователь успешно зарегистрирован"

    @staticmethod
    def authenticate_user(data):
        is_valid, error_message = validate_data(data, ['phone_number', 'password'])
        if not is_valid:
            return None, error_message

        user = User.query.filter_by(phone_number=data['phone_number']).first()
        if user and check_password_hash(user.password, data['password']):
            return user, None
        return None, "Неправильный пароль или пользователь не существует"

    @staticmethod
    def get_user_profile(user_id):
        return User.query.get(user_id)

    @staticmethod
    def update_user_profile(user_id, data):
        user = User.query.get(user_id)
        if not user:
            return None, "Пользователь не найден"

        if 'phone_number' in data:
            existing_user = User.query.filter_by(phone_number=data['phone_number']).first()
            if existing_user and existing_user.id != user_id:
                return None, "Данный номер телефона уже используется другим пользователем"
            user.phone_number = data['phone_number']
        if 'full_name' in data:
            user.full_name = data['full_name']

        db.session.commit()

        return user, "Профиль успешно обновлен"
