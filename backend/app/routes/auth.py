from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models import User
from .. import db
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    if all(field is None for field in [username, email, password, full_name, phone_number]):
        return jsonify({"msg": "Заполнены не все поля"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Такой пользователь уже существует"}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, full_name=full_name,
                    phone_number=phone_number)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Пользователь успешно зарегестрирован"}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Заполнены не все поля"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Неправильный пароль или пользователь не существует"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify(access_token=access_token), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Пользователь не найден"}), 404

    profile_data = {
        "username": user.username,
        "email": user.email,
        "fullName": user.full_name,
        "bonusPoints": user.bonus_points,
        "phoneNumber": user.phone_number,
    }

    return jsonify(profile_data), 200


@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Пользователь не найден"}), 404

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    # Обновление только тех полей, что захотел пользователь
    if username:
        user.username = username
    if email:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"msg": "Данная почта уже используется другим пользователем"}), 409
        user.email = email
    if full_name:
        user.full_name = full_name
    if phone_number:
        user.phone_number = phone_number

    db.session.commit()

    return jsonify({"msg": "Профиль успешно обновлен"}), 200
