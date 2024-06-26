from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import OrderService, OrderGetService, UserService

orders_bp = Blueprint('orders', __name__)


@orders_bp.route('/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    order, msg = OrderService.create_new_order(data)
    status_code = 201 if order else 400
    return jsonify({"success": bool(order), "msg": msg}), status_code


@orders_bp.route('/get_order/<string:order_id>', methods=['GET'])
def get_order(order_id):
    order = OrderGetService.get_order_by_id(order_id)
    if not order:
        return jsonify({"success": False, "msg": "Заказ не найден"}), 404
    return jsonify({"success": True, "order": order}), 200


@orders_bp.route('/get_orders', methods=['GET'])
def get_orders():
    orders = OrderGetService.get_all_orders()
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/get_orders_by_phone/<string:phone_number>', methods=['GET'])
def get_orders_by_phone(phone_number):
    orders = OrderGetService.get_orders_by_phone_number(phone_number)
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/get_incomplete_orders', methods=['GET'])
def get_incomplete_orders():
    orders = OrderGetService.get_incomplete_orders()
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/history', methods=['GET'])
@jwt_required()
def get_user_order_history():
    user_id = get_jwt_identity()
    phone_number = UserService.get_phone_number_by_user_id(user_id)
    orders = OrderGetService.get_orders_by_phone_number(phone_number)
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/update_order/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    order, msg = OrderService.update_order(order_id, **data)
    status_code = 200 if order else 400
    return jsonify({"success": bool(order), "msg": msg}), status_code


@orders_bp.route('/delete_order/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    success, msg = OrderService.delete_order(order_id)
    status_code = 200 if success else 404
    return jsonify({"success": success, "msg": msg}), status_code
