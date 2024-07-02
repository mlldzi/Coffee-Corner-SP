from flask import request, jsonify, Blueprint
from flask_jwt_extended import (get_jwt_identity, unset_jwt_cookies,
                                jwt_required, set_access_cookies, create_access_token)
from datetime import timedelta
from app.services import AuthService
from app.utils import generate_auth_response

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user, msg = AuthService.register_user(data)

    if not user:
        return jsonify({"success": False, "msg": msg}), 409

    response = generate_auth_response(user.id)
    return response, 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user, msg = AuthService.authenticate_user(data)

    if not user:
        return jsonify({"success": False, "msg": msg}), 401

    response = generate_auth_response(user.id)
    return response, 200


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
        "bonus_points": user.bonus_points,
    }

    return jsonify({"success": True, "profile": profile_data}), 200


@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()
    user, msg = AuthService.update_user_profile(user_id, data)

    if not user:
        return jsonify({"success": False, "msg": msg}), 404 if msg == "Пользователь не найден" else 409

    return jsonify({"success": True, "msg": msg}), 200


@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"success": True})
    unset_jwt_cookies(response)
    return response, 200


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    response = jsonify({"refresh": True})
    set_access_cookies(response, access_token)
    return response, 200


@auth_bp.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    identity = get_jwt_identity()
    user, msg = AuthService.delete_user_profile(identity)

    if not user:
        return jsonify({"success": False, "msg": msg}), 404 if msg == "Пользователь не найден" else 409

    return jsonify({"success": True, "msg": msg}), 200
