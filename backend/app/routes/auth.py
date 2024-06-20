from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

from app.services import AuthService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    full_name = data.get('full_name')
    password = data.get('password')
    phone_number = data.get('phone_number')

    if not all([full_name, password, phone_number]):
        return jsonify({"success": False, "msg": "Заполнены не все поля"}), 400

    user, msg = AuthService.register_user(full_name, password, phone_number)
    if not user:
        return jsonify({"success": False, "msg": msg}), 409

    return jsonify({"success": True, "msg": msg}), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not phone_number or not password:
        return jsonify({"success": False, "msg": "Заполнены не все поля"}), 400

    user = AuthService.authenticate_user(phone_number, password)
    if not user:
        return jsonify({"success": False, "msg": "Неправильный пароль или пользователь не существует"}), 401

    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    return jsonify({"success": True, "access_token": access_token}), 200


@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = AuthService.get_user_profile(user_id)

    if not user:
        return jsonify({"success": False, "msg": "Пользователь не найден"}), 404

    profile_data = {
        "full_name": user.full_name,
        "phone_number": user.phone_number,
    }

    return jsonify({"success": True, "profile": profile_data}), 200


@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    user, msg = AuthService.update_user_profile(user_id, full_name, phone_number)
    if not user:
        return jsonify({"success": False, "msg": msg}), 404 if msg == "Пользователь не найден" else 409

    return jsonify({"success": True, "msg": msg}), 200
