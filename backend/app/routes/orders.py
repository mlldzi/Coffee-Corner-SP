from flask import Blueprint, request, jsonify
from app.services.order_service import OrderService

orders_bp = Blueprint('orders', __name__)


@orders_bp.route('/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    phone_number = data.get('phone_number')
    cart = data.get('cart')
    prepared_by = data.get('prepared_by')
    total_amount = data.get('total_amount')

    if not all([phone_number, cart, prepared_by, total_amount]):
        return jsonify({"success": False, "msg": "Заполнены не все поля"}), 400

    order, msg = OrderService.create_new_order(phone_number, cart, prepared_by, total_amount)
    status_code = 201 if order else 400

    return jsonify({"success": bool(order), "msg": msg}), status_code


@orders_bp.route('/get_order/<string:order_id>', methods=['GET'])
def get_order(order_id):
    order = OrderService.get_order_by_id(order_id)
    if order:
        return jsonify({"success": True, "order": order}), 200
    return jsonify({"success": False, "msg": "Заказ не найден"}), 404


@orders_bp.route('/get_orders', methods=['GET'])
def get_orders():
    orders = OrderService.get_all_orders()
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/get_orders_by_phone/<string:phone_number>', methods=['GET'])
def get_orders_by_phone(phone_number):
    orders = OrderService.get_orders_by_phone_number(phone_number)
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/get_incomplete_orders', methods=['GET'])
def get_incomplete_orders():
    orders = OrderService.get_incomplete_orders()
    return jsonify({"success": True, "orders": orders}), 200


@orders_bp.route('/update_order/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    phone_number = data.get('phone_number')
    cart = data.get('cart')
    prepared_by = data.get('prepared_by')
    total_amount = data.get('total_amount')
    is_completed = data.get('is_completed')

    order, msg = OrderService.update_order(order_id, phone_number, cart, prepared_by, total_amount, is_completed)
    status_code = 200 if order else 400

    return jsonify({"success": bool(order), "msg": msg}), status_code


@orders_bp.route('/delete_order/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    success, msg = OrderService.delete_order(order_id)
    status_code = 200 if success else 404

    return jsonify({"success": success, "msg": msg}), status_code
