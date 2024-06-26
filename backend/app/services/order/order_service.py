from datetime import datetime
from app import db
from app.models import Order
from app.utils import validate_data


class OrderService:
    @staticmethod
    def create_new_order(data):
        required_fields = ['phone_number', 'cart', 'prepared_by', 'total_amount']
        valid, error_msg = validate_data(data, required_fields)
        if not valid:
            return None, error_msg

        phone_number = data['phone_number']
        cart = data['cart']
        prepared_by = data['prepared_by']
        total_amount = data['total_amount']

        try:
            prepared_by = datetime.strptime(prepared_by, '%Y-%m-%d %H:%M')
        except ValueError:
            return None, "Неверный формат времени"

        new_order = Order(
            phone_number=phone_number,
            cart=cart,
            prepared_by=prepared_by,
            total_amount=total_amount
        )

        db.session.add(new_order)
        db.session.commit()

        return new_order, "Заказ успешно создан"

    @staticmethod
    def update_order(order_id, data):
        required_fields = ['phone_number', 'cart', 'prepared_by', 'total_amount']

        valid, error_msg = validate_data(data, required_fields)
        if not valid:
            return None, error_msg

        if order_id == "latest":
            order = Order.query.order_by(Order.id.desc()).first()
        else:
            try:
                order_id = int(order_id)
                order = Order.query.get(order_id)
            except ValueError:
                return None, "Неверный формат order_id"

            if not order:
                return None, "Заказ не найден"

        try:
            if 'prepared_by' in data:
                prepared_by = data['prepared_by']
                prepared_by = datetime.strptime(prepared_by, '%Y-%m-%d %H:%M')
                order.prepared_by = prepared_by

            if 'phone_number' in data:
                order.phone_number = data['phone_number']

            if 'cart' in data:
                order.cart = data['cart']

            if 'total_amount' in data:
                order.total_amount = data['total_amount']

            if 'is_completed' in data:
                order.is_completed = data['is_completed']

            db.session.commit()
            return order, "Заказ успешно обновлен"
        except ValueError:
            db.session.rollback()
            return None, "Неверный формат времени"

    @staticmethod
    def delete_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            return False, "Заказ не найден"

        db.session.delete(order)
        db.session.commit()

        return True, "Заказ успешно удален"
