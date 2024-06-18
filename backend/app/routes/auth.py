from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from ..services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    if not all([username, email, password, full_name, phone_number]):
        return jsonify({"msg": "Заполнены не все поля"}), 400

    user, msg = AuthService.register_user(username, email, password, full_name, phone_number)
    if not user:
        return jsonify({"msg": msg}), 409

    return jsonify({"msg": msg}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Заполнены не все поля"}), 400

    user = AuthService.authenticate_user(email, password)
    if not user:
        return jsonify({"msg": "Неправильный пароль или пользователь не существует"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify(access_token=access_token), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = AuthService.get_user_profile(user_id)

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
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    user, msg = AuthService.update_user_profile(user_id, username, email, full_name, phone_number)
    if not user:
        return jsonify({"msg": msg}), 404 if msg == "Пользователь не найден" else 409

    return jsonify({"msg": msg}), 200
